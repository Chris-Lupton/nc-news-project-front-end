import { useEffect, useState } from "react"
import { ArticleCard } from "./ArticleCard"
import { getArticles } from "../utils/api"
import { Pagination } from "./Pagination"

export function ArticleList () {

    const [isLoading, setIsLoading] = useState(false)
    const [articles, setArticles] = useState({1: []})
    const [page, setPage] = useState(1)

    useEffect(() => {
        setIsLoading(true)
        getArticles(page).then((articleData) => {
            setIsLoading(false)
            setArticles((currArticles) => {
                const copyArticles = {...currArticles}
                copyArticles[page] = articleData
                return copyArticles
            })
        })
    }, [])

    useEffect(() => {
        getArticles(page+1).then((articleData) => {
            setArticles((currArticles) => {
                const copyArticles = {...currArticles}
                copyArticles[page+1] = articleData
                return copyArticles
            })
        })
    }, [page])

    if(isLoading) return <div className="loader"></div>

    return (
    <article className="article-list">
        <ul>
        <Pagination page={page} setPage={setPage} articles={articles}/>
            {articles[page].map(article => {
                return <ArticleCard key={article.article_id} article={article}/>
            })}
        </ul>
        <Pagination page={page} setPage={setPage} articles={articles}/>
    </article>
    )
}