import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getArticles, getUser } from "../utils/api"
import { UserContext } from "../contexts/user"
import { ArticleCard } from "./ArticleCard"

export function UserPage() {
    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [usersArticles, setUsersArticles] = useState([])
    const { user_name } = useParams()
    const { user } = useContext(UserContext)

    useEffect(() => {
      setIsLoading(true)
      getUser(user_name).then((userData) => {
        setIsLoading(false)
        setUserData(userData)
      })
    }, [user_name])

    useEffect(() => {
      getArticles().then((articlesData) => {
          setUsersArticles(articlesData.filter(article => article.author === user_name))
      })
    }, [])

    if (isLoading) return <div className="loader"></div>

    return (
      <main id="user-page">
            <h2>{userData.username}</h2>
            <h3>{userData.name}</h3>
            <img className='avatar' src={userData.avatar_url} alt={userData.username + 's avatar'} />
            <p>{userData.username}'s articles</p>
            <ul>
              {usersArticles.map(article => {
                  return <ArticleCard key={article.article_id} article={article}/>
              })}
            </ul>

      </main>
    )
}