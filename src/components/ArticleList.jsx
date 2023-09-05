import { useEffect, useState } from "react"
import { ArticleCard } from "./ArticleCard"
import { getArticles } from "../utils/api"
import { Pagination } from "./Pagination"

export function ArticleList ({ topic }) {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [articles, setArticles] = useState({1: []})
    const [page, setPage] = useState(1)

    useEffect(() => {
        setIsLoading(true)
        getArticles(page, topic).then((articleData) => {
            setIsLoading(false)
            if (typeof(articleData) === 'String') {
                setError(articleData)
                console.log(articleData);
            } else {
                setArticles((currArticles) => {
                    const copyArticles = {...currArticles}
                    copyArticles[page] = articleData
                    return copyArticles
                })
            }
        })
    }, [topic])

    useEffect(() => {
        getArticles(page+1, topic).then((articleData) => {
            setArticles((currArticles) => {
                const copyArticles = {...currArticles}
                copyArticles[page+1] = articleData
                return copyArticles
            })
        })
    }, [page, topic])

    if (isLoading) return <div className="loader"></div>

    if (error) return <p>{error.msg}</p>

    return (
    <article>
        <Pagination page={page} setPage={setPage} articles={articles}/>
        <ul>
            <div className="article-list">
                {articles[page].map(article => {
                    return <ArticleCard key={article.article_id} article={article}/>
                })}
            </div>
        </ul>
        <Pagination page={page} setPage={setPage} articles={articles}/>
    </article>
    )
}