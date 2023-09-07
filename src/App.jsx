import { Route, Routes } from "react-router-dom"
import { Articles } from "./components/Articles"
import { Header } from './components/Header'
import { Article } from "./components/Article"
import { PageNotFound } from "./components/PageNotFound"
import './App.css'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:topic" element={<Articles />} />
        <Route path="/articles/:topic/:article_id" element={<Article />} />
        <Route path='*' element={<PageNotFound />}/>
      </Routes>
    </>
  )
}

export default App
