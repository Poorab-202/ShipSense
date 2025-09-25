import { useState } from 'react'
import './App.css'
import Login from './components/auth/login'
import Navbar from './components/shared/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login></Login>
    </>
  )
}

export default App
