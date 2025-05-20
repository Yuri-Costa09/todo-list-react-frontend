import type React from "react"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../auth/AuthContext"
import { TasksContext } from "../contexts/TasksContext"
import type { Task } from "../services/tasksService"
import { PlusCircle, CheckCircle, Circle, Trash2, LogOut } from "lucide-react"

const Tasks: React.FC = () => {
  const [newTask, setNewTask] = useState("")
  const { logout } = useContext(AuthContext)
  const { tasks, fetchTasks, addTask, toggleTaskCompletion, deleteTask } = useContext(TasksContext)

  useEffect(() => {
    console.log("Tasks component mounted")
    fetchTasks()
  }, [])

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      await addTask(newTask.trim())
      setNewTask("")
    }
  }

  const handleToggleTask = async (task: Task) => {
    await toggleTaskCompletion(task)
  }

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id)
  }

  return ( <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1> <button onClick={logout} className="flex items-center text-gray-600 hover:text-red-600 transition-colors"> <LogOut className="h-4 w-4 mr-1" /> <span>Logout</span> </button> </div> {/* Add new task form */} <form onSubmit={handleAddTask} className="mb-6"> <div className="flex gap-2"> <input type="text" value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!newTask.trim()}
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add</span>
            </button>
          </div>
        </form> {/* Tasks list */} <div className="space-y-2"> {tasks.length === 0 ? ( <p className="text-center text-gray-500 py-4">No tasks yet. Add one above!</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50"
              >
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => handleToggleTask(task)}
                    className="text-gray-400 hover:text-blue-600 focus:outline-none"
                  >
                    {task.complete ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </button>
                  <span className={`flex-1 ${task.complete ? "line-through text-gray-500" : "text-gray-800"}`}>
                    {task.description}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-gray-400 hover:text-red-600 focus:outline-none"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Task summary */}
        {tasks.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            <p>
              {tasks.filter((task) => task.complete).length} of {tasks.length} tasks completed
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tasks
