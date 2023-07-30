import { FC } from "react"
import { useStore } from "../context/store"

import { Task } from "../types/task"

export interface TaskItemProps {
  task: Task
}

const TaskItem: FC<TaskItemProps> = ({ task }) => {
  const { user, toggleCompleteStatus, deleteTask } = useStore()

  const handleDelete = async () => {
    if (user?.id !== task.createdBy)
      return alert("You can only delete tasks you created")
    deleteTask(task.id)
  }

  const handleToggle = () => toggleCompleteStatus(task.id)

  return (
    <div className="task-card">
      <h2 className="task-card-title">{task.title}</h2>
      <p className="task-card-description">{task.description}</p>
      <button onClick={handleToggle} className="task-button">
        {task.complete ? "Mark Incomplete" : "Mark Complete"}
      </button>
      <button onClick={handleDelete} className="task-button task-button-delete">
        Delete
      </button>
    </div>
  )
}

export default TaskItem
