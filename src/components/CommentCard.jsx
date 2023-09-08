import { Link } from "react-router-dom"
import { DeleteComment } from "./DeleteComment.jsx"
import { useState } from "react"
import { patchComment } from "../utils/api.js"

export function CommentCard ({ comment, setComments, page }) {

    const [hasVotedUp, setHasVotedUp] = useState('not-voted')
    const [hasVotedDown, setHasVotedDown] = useState('not-voted')

    function vote (event) {
        let vote
        if (event.target.id === 'vote-up'){
            if (event.target.className === 'voted'){ 
                setHasVotedUp('not-voted')
                vote = -1
            } else {
                setHasVotedUp('voted')
                vote = 1
            }
        } else if (event.target.id === 'vote-down'){
            if (event.target.className === 'voted'){ 
                setHasVotedDown('not-voted')
                vote = 1
            } else {
                setHasVotedDown('voted')
                vote = -1
            }
        }
        comment.votes += vote
        patchComment(comment.comment_id, vote).catch((err) => {
            alert(err.response.data.msg)
        })
    }

    return (
        <li className="comment-in-list">
            <Link className="comment-author-link">{comment.author}</Link>
            <p className="comment-created-at">{new Date(comment.created_at).toDateString()}</p>
            <p className="comment-body">{comment.body}</p>
            <div>
                <p className="comment-votes">Votes: {comment.votes}</p>
                <button onClick={vote} id='vote-up' className={hasVotedUp}>+</button>
                <button onClick={vote} id='vote-down' className={hasVotedDown}>-</button>
            </div>
            <DeleteComment comment={comment} setComments={setComments} page={page}/>
        </li>
    )
}