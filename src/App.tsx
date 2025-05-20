import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
// import '@./App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Tasks from './pages/Tasks'
import PrivateRoute from './auth/PrivateRoute'
import { AuthProvider } from './auth/AuthContext'
import { TasksProvider } from './contexts/TasksContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TasksProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/tasks" replace />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* Protected Routes */}
            <Route 
              path="/tasks/*"
              element={
                <PrivateRoute>
                  <Tasks />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </TasksProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
