import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../contexts/user"
import { DeleteArticle } from "./DeleteArticle"

export function ArticleCard ({article}) {

    const { user } = useContext(UserContext)

    return (
    <div className="article-space">
    <li className="article-in-list">
        <Link to={`/users/${article.author}`} className="article-author-link">{article.author}</Link>
        <Link to={`/articles/${article.topic}/${article.article_id}`} className="article-box">
            <img className="article-img" src={article.article_img_url} alt={`image relating to ${article.topic}`} />
            <div className="article-info">
                <p className="article-topic">{article.topic}</p>
                <p className="article-created_at">{new Date(article.created_at).toDateString()}</p>
                <h3 className="article-title">{article.title}</h3>
                <p>Votes: {article.votes}</p>
                <p>Comments: {article.comment_count}</p>
                {article.author === user ? <DeleteArticle article={article}/> : <div></div>}
            </div>
        </Link>
    </li>
    </div>
    )
}