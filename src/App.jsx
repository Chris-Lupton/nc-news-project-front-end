import { Route, Routes } from "react-router-dom"
import { Articles } from "./components/Articles"
import { Header } from './components/Header'
import { Article } from "./components/Article"
import './App.css'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<Article />} />
      </Routes>
    </>
  )
}

export default App
