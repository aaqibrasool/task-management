import { Task, addTask } from "./task"

export interface storeContextType {
  user: null | user
  tasks: Task[]
  login: (id: string) => Promise<void>
  addTask(task: addTask): Promise<boolean>
  toggleCompleteStatus: (id: string) => Promise<boolean>
  reorderTasks: (startIndex: number, endIndex: number) => Promise<void>
  deleteTask(id: string): Promise<boolean>
}

export interface storeContextProps {
  children: React.ReactNode
}

export interface user {
  id: string
  email: string
  group: string
}
