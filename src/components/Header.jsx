import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from '../contexts/user'
import { getTopics } from "../utils/api"

export function Header () {

  const navigate = useNavigate()
  const [topics, setTopics] = useState([])
  const { user } = useContext(UserContext)

  useEffect(() => {
    getTopics().then((topicData) => {
      setTopics(topicData)
    })
  }, [])

  function handleClick(event) {
    navigate(`/articles?topic=${event.target.value}`)
  }

  return (
    <header className="header">
        <Link to="/articles"><h1>NC News</h1></Link>
        <Link>Logged in as: {user}</Link>
        <select onClick={handleClick} id="topics">
        <option value="">All topics</option>
        {topics.map((topic) => {
          return (
            <option key={topic.slug} value={topic.slug}>
              {topic.slug}
            </option>
          );
        })}
        </select>
    </header>
  )
}