import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticleById } from "../utils/api"
import { CommentList } from "./CommentList"
import { Link } from "react-router-dom"

export function Article () {

    const [isLoading, setIsLoading] = useState(false)
    const [article, setArticle] = useState({})
    const { article_id } = useParams()

    useEffect(() => {
        setIsLoading(true)
        getArticleById(article_id).then((articleData) => {
            setIsLoading(false)
            setArticle(articleData)
        })
    }, [article_id])

    if (isLoading) return <div className="loader"></div>

    return (
        <main className="article">
            <Link className='nav' id="topic">{article.topic}</Link>
            <p id='created_at'>{new Date(article.created_at).toDateString()}</p>
            <Link id='author'>{article.author}</Link>
            <h3>{article.title}</h3>
            <img src={article.article_img_url} alt={`image relating to ${article.topic}`} />
            <p id='body'>{article.body}</p>
            <section>
                <p id="votes">Votes: {article.votes}</p>
                <button>+</button>
                <button>-</button>
            </section>
            <CommentList article_id={article_id}/>
        </main>
    )
}