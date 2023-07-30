import { FC } from "react"
import { Route, Routes } from "react-router-dom"

import { useStore } from "./context/store"

import Home from "./pages/Home"
import SignIn from "./pages/SignIn"

const App: FC = () => {
  const { user } = useStore()

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Home /> : <SignIn />} />
        <Route path="signin" element={<SignIn />} />
      </Routes>
    </>
  )
}

export default App
