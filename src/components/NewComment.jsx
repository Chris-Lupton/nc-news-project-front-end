import { Link } from "react-router-dom"

export function NewComment ({ comment, commentLoading, isError }) {

    if (commentLoading) return (
        <li key='newComment' className="comment-in-list">
            <div className="mini-loader"></div>
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

    if (isError)return (
        <li key='error'className="comment-in-list">
            <p>An error occurred while posting your comment, please try again</p>
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








