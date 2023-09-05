import { Link } from "react-router-dom"

export function CommentCard ({ comment }) {
    return (
        <li className="comment-in-list">
            <Link className="comment-author-link">{comment.author}</Link>
            <p className="comment-created-at">{new Date(comment.created_at).toDateString()}</p>
            <p className="comment-body">{comment.body}</p>
            <div>
                <p className="comment-votes">Votes: {comment.votes}</p>
                <button>+</button>
                <button>-</button>
            </div>
            
        </li>
    )
}