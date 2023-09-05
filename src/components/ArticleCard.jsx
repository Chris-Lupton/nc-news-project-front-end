import { Link } from "react-router-dom"

export function ArticleCard ({article}) {

    return (
    <li className="article-in-list">
        <Link className="article-author-link">{article.author}</Link>
        <Link to={`/articles/${article.article_id}`} className="article-box">
            <p className="article-topic">{article.topic}</p>
            <p className="article-created_at">{new Date(article.created_at).toDateString()}</p>
            <img className="article-img" src={article.article_img_url} alt={`image relating to ${article.topic}`} />
            <h3 className="article-title">{article.title}</h3>
        </Link>
    </li>
    )
}