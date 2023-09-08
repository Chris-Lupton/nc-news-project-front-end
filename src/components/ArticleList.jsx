import { useEffect, useState } from "react"
import { ArticleCard } from "./ArticleCard"
import { getArticles } from "../utils/api"
import { Pagination } from "./Pagination"

export function ArticleList ({ topic, sort_by, order }) {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [articles, setArticles] = useState({1: []})
    const [page, setPage] = useState(1)

    useEffect(() => {
        setError('')
        setIsLoading(true)
        getArticles(page, topic, sort_by, order).then((articleData) => {
            setIsLoading(false)
            setArticles((currArticles) => {
                const copyArticles = {...currArticles}
                copyArticles[page] = articleData
                return copyArticles
            })
        }).catch ((err) => {
            setIsLoading(false)
            setError(`${err.response.data.status} ${err.response.data.msg}`)
        })
    }, [topic, sort_by, order])

    useEffect(() => {
        getArticles(page+1, topic, sort_by, order).then((articleData) => {
            setArticles((currArticles) => {
                const copyArticles = {...currArticles}
                copyArticles[page+1] = articleData
                return copyArticles
            })
        })
    }, [page, topic, sort_by, order])

    if (isLoading) return <div className="loader"></div>

    if (error) return <p className="error">{error}</p>

    return (
    <div>
        <ul>
            <div className="article-list">
                {articles[page].map(article => {
                    return <ArticleCard key={article.article_id} article={article}/>
                })}
            </div>
        </ul>
        <Pagination page={page} setPage={setPage} list={articles}/>
    </div>
    )
}