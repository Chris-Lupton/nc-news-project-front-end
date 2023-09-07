import { useContext, useEffect, useState } from "react"
import { getCommentsForArticle, postComment } from "../utils/api"
import { CommentCard } from "./CommentCard"
import { Pagination } from "./Pagination"
import { UserContext } from "../contexts/user"
import { NewComment } from "./NewComment"

export function CommentList ({article_id}) {
    
    const { user } = useContext(UserContext)
    const [comments, setComments] = useState({1:[]})
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [commentInput, setCommentInput] = useState('')
    
    const [newComment, setNewComment] = useState({})
    const [commentLoading, setCommentLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getCommentsForArticle(article_id, page).then((commentData) => {
            setIsLoading(false)
            setComments((currComments) => {
                const copyComments = {...currComments}
                copyComments[page] = commentData
                return copyComments
            })
        })
    }, [])

    useEffect(() => {
        getCommentsForArticle(article_id, page+1).then((commentData) => {
            setComments((currComments) => {
                const copyComments = {...currComments}
                copyComments[page+1] = commentData
                return copyComments
            })
        })
    }, [page])

    function handleInput(event) {
        setCommentInput(event.target.value)
    }

    function handlePost(event) {
        event.preventDefault()
        if(!commentInput){
            alert('Please input comment')
        } else {
            setCommentLoading(true)
            setNewComment({body:commentInput, votes:0, author:user, created_at:Date.now()})
            postComment(article_id, {username: user, body: commentInput}).then((postedComment)=>{
                setCommentLoading(false)
                setComments((currComments) => {
                    const copyComments = {}
                    Object.entries(currComments).forEach(([key, value]) => {
                        copyComments[key] = [...value]
                    })
                    copyComments[1].unshift(postedComment)
                    return copyComments
                })
            }).catch((err) => {
                setCommentLoading(false)
                setIsError(true)
            })
            setCommentInput('')
        }
    }

    if (isLoading) return <div className="loader"></div>

    return (
        <div>
            <p id='comments'>Comments</p>
            <form className="comment-form">
                <textarea onChange={handleInput} value={commentInput} placeholder="Add a comment..."></textarea>
                <button onClick={handlePost}>Post</button>
            </form>
            <ul>
                <div className="comment-list">
                    <NewComment comment={newComment} commentLoading={commentLoading} isError={isError}/>
                    {comments[page].map(comment => {
                        return <CommentCard key={comment.comment_id} comment={comment} setComments={setComments} page={page}/>
                    })}
                </div>
            </ul>
            <Pagination page={page} setPage={setPage} list={comments}/>
        </div>
    )
}