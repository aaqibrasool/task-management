import { FC, useState } from "react"
import { useStore } from "../context/store"

import { addTask } from "../types/task"

const AddTaskForm: FC = () => {
  const [newTask, setNewTask] = useState<addTask>({
    title: "",
    description: "",
  })

  const { addTask } = useStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const isTaskAdded = await addTask({ ...newTask })
    if (isTaskAdded) setNewTask({ title: "", description: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>Add Task</h2>
      <div className="form-group">
        <label htmlFor="taskTitle">Task Title:</label>
        <input
          id="taskTitle"
          type="text"
          value={newTask.title}
          onChange={(e) =>
            setNewTask((prevState) => ({
              ...prevState,
              title: e.target.value,
            }))
          }
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="taskDescription">Task Description:</label>
        <textarea
          id="taskDescription"
          value={newTask.description}
          onChange={(e) =>
            setNewTask((prevState) => ({
              ...prevState,
              description: e.target.value,
            }))
          }
          required
          className="form-control"
        />
      </div>
      <button type="submit" className="form-button">
        Add Task
      </button>
    </form>
  )
}

export default AddTaskForm
