import { UserContext } from "../contexts/user"
import { useContext, useState } from "react"
import { deleteComment } from "../utils/api"

export function DeleteComment ({ comment, setComments, page }) {

    const { user } = useContext(UserContext)
    const [commentDeleting, setCommentDeleting] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)

    function handleDelete() {
        setIsError(false)
        setCommentDeleting(true)
        setIsDeleted(false)
        deleteComment(comment.comment_id).then(() => {
            setCommentDeleting(false)
            setIsDeleted(true)
            setComments((currComments) => {
                const copyComments = {}
                Object.entries(currComments).forEach(([key, value]) => {
                    copyComments[key] = [...value]
                })
                copyComments[page].forEach(copy => {
                    if(copy.comment_id === comment.comment_id){
                        copy.body = 'Comment deleted'
                    }
                })
                return copyComments
            })
        }).catch(() => {
            setCommentDeleting(false)
            setIsError(true)
        })
    }
    
    if(commentDeleting) return <div className="mini-loader"></div>
    
    if(isError) return <p>Could not delete comment</p>
    
    if(user === comment.author && !isDeleted) return <button className='delete' onClick={handleDelete}>Delete comment</button>

}
