export interface Task {
  id: string
  title: string
  description: string
  complete: boolean
  group: string
  createdBy: string
}

export type addTask = Pick<Task, "title" | "description">
