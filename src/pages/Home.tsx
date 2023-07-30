import { FC } from "react"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd"

import { useStore } from "../context/store"
import { AddTaskForm, TaskItem } from "../components"

const Home: FC = () => {
  const { user, tasks, reorderTasks } = useStore()

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return
    reorderTasks(result.source.index, result.destination.index)
  }

  return (
    <div className="home-page">
      {user ? (
        <>
          <h1>Task Management</h1>

          <div className="display-area">
            <div className="tasks-area">
              <h2>All Tasks in group: {user.group}</h2>
              {tasks.length ? (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="droppable" direction="horizontal">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <div className="tasks">
                          {tasks.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <TaskItem task={item} />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              ) : (
                <p>No Tasks</p>
              )}
            </div>
            <AddTaskForm />
          </div>
        </>
      ) : (
        <h1>Please Login to see your tasks</h1>
      )}
    </div>
  )
}

export default Home
