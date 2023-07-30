import { createContext, useContext, FC, useState, useEffect } from "react"
import { useSnackbar } from "notistack"

import { db } from "../firebase"
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore"

import { storeContextType, storeContextProps, user } from "../types/store"
import { Task, addTask } from "../types/task"

const StoreContext = createContext<storeContextType>({
  user: null,
  tasks: [],
  login: () => Promise.resolve(),
  addTask: () => Promise.resolve(true),
  toggleCompleteStatus: () => Promise.resolve(true),
  reorderTasks: () => Promise.resolve(),
  deleteTask: () => Promise.resolve(true),
})

export const useStore = () => useContext(StoreContext)

const StoreProvider: FC<storeContextProps> = ({ children }) => {
  const [user, setUser] = useState<user | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [previousTasks, setPreviousTasks] = useState<Task[]>([])
  const { enqueueSnackbar } = useSnackbar()

  const showSnackbar = (message: string, variant: "success" | "error") => {
    enqueueSnackbar(message, {
      variant,
      preventDuplicate: true,
    })
  }

  const login = async (id: string) => {
    try {
      const userDocRef = doc(db, "users", id)
      const userDocSnap = await getDoc(userDocRef)
      if (!userDocSnap.exists()) return
      let user = { ...userDocSnap.data(), id: userDocSnap.id } as user
      setUser(user)
    } catch (e) {
      console.log(e)
    }
  }

  const addTask = async (task: addTask) => {
    if (!user) return false
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      complete: false,
      createdBy: user.id,
      group: user.group,
    }
    const groupDocRef = doc(db, "groups", user.group)
    try {
      await setDoc(groupDocRef, {
        tasks: [...tasks, newTask],
      })
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }

  const toggleCompleteStatus = async (taskId: string) => {
    if (!user) return false
    const groupDocRef = doc(db, "groups", user.group)
    try {
      await setDoc(groupDocRef, {
        tasks: tasks.map((t) =>
          t.id === taskId ? { ...t, complete: !t.complete } : t
        ),
      })
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }

  const reorderTasks = async (startIndex: number, endIndex: number) => {
    const result = Array.from(tasks)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    if (!user) return
    const groupDocRef = doc(db, "groups", user.group)
    try {
      await setDoc(groupDocRef, {
        tasks: result,
      })
    } catch (e) {
      console.log(e)
    }
  }

  const deleteTask = async (taskId: string) => {
    if (!user) return false
    const groupDocRef = doc(db, "groups", user.group)
    try {
      await setDoc(groupDocRef, {
        tasks: tasks.filter((t) => t.id !== taskId),
      })
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }

  useEffect(() => {
    if (!user) return
    const getAllTasksOfUserGroup = async () => {
      const groupDocRef = doc(db, "groups", user.group)
      await onSnapshot(groupDocRef, (snap) => {
        if (!snap.exists()) return

        const newTasksArray = snap.data().tasks as Task[]
        setTasks(newTasksArray)
      })
    }
    getAllTasksOfUserGroup()
  }, [user])

  useEffect(() => {
    setPreviousTasks([...tasks])
    if (!previousTasks.length) return
    if (tasks.length > previousTasks.length) {
      showSnackbar("New task added", "success")
      return
    }
    if (tasks.length < previousTasks.length) {
      showSnackbar("Task deleted", "error")
      return
    }
    if (
      previousTasks.map((el) => el.id).join("") !==
      tasks.map((el) => el.id).join("")
    ) {
      showSnackbar("Task order changed", "success")
      return
    }
    for (let i = 0; i < tasks.length; i++) {
      if (previousTasks[i].complete !== tasks[i].complete) {
        const changedTask = tasks[i]
        if (changedTask.complete)
          showSnackbar(`Task ${changedTask.title} is completed`, "success")
        else showSnackbar(`${changedTask.title} in incomplete`, "error")
      }
    }
  }, [tasks])

  return (
    <StoreContext.Provider
      value={{
        user,
        tasks,
        login,
        addTask,
        toggleCompleteStatus,
        reorderTasks,
        deleteTask,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
