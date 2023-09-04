import { Link } from "react-router-dom"

export function ArticleCard ({article}) {
    return (
    <li className="article-in-list">
        <Link className="article-author-link">{article.author}</Link>
        <Link className="article-box">
            <p className="article-topic">{article.topic}</p>
            {/* <p className="article-created_at">{article.created_at}</p> */}
            <img className="article-img" src={article.article_img_url} alt="" />
            <h3 className="article-title">{article.title}</h3>
            <section>
                <p className="article-votes">Votes: {article.votes}</p>
                <button>Up</button>
                <button>Down</button>
                <p className="article-comment-count">{article.comment_count} comments</p>
            </section>
        </Link>
    </li>
    )
}