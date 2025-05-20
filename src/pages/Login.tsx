import type React from "react"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../auth/AuthContext"

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      console.log("Attempting login with:", email, password)
      // vai usar o login do authContext
      await login(email, password)
      navigate("/tasks")
    } catch (err) {
      console.error("Login failed:", err)
      setError("Login failed. Please try again.")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>

        {error && <div className="p-3 text-sm text-red-600 bg-red-100 rounded-md">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Insert your password"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Doesn't have an account?{" "}
          <button onClick={() => navigate("/register")} className="text-blue-600 hover:underline focus:outline-none">
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
