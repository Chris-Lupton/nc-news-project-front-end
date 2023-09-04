import { Route, Routes } from "react-router-dom"
import { Articles } from "./components/Articles"
import { Header } from './components/Header'
import './App.css'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/articles" element={<Articles />} />

      </Routes>
    </>
  )
}

export default App
