import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../contexts/user"
import { BiUpvote } from 'react-icons/bi'
import { BiComment } from 'react-icons/bi'

export function ArticleCard ({article}) {

    const { user } = useContext(UserContext)

    return (
    <li className="article-in-list">
        <Link to={`/articles/${article.topic}/${article.article_id}`} className="article-box">
            <h3 className="article-title">{article.title}</h3>
            <img className="article-img" src={article.article_img_url} alt={`image relating to ${article.topic}`} />
            <div className="article-info">
                <p className="article-topic">{article.topic}</p>
                <p className="article-author">{article.author}</p>
                <p className="article-created_at">{new Date(article.created_at).toDateString()}</p>
                <p className="article-votes"> <BiUpvote size={14}/> {article.votes}</p>
                <p className="article-comments"> <BiComment size={14}/> {article.comment_count}</p>
            </div>
        </Link>
    </li>
    )
}