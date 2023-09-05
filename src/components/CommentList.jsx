import { useEffect, useState } from "react"
import { getCommentsForArticle } from "../utils/api"
import { CommentCard } from "./CommentCard"
import { Pagination } from "./Pagination"

export function CommentList ({article_id}) {
    
    const [comments, setComments] = useState({1:[]})
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

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

    if (isLoading) return <div className="loader"></div>

    return (
        <div>
            <p id='comments'>Comments</p>
            <ul>
                <div className="comment-list">
                    {comments[page].map(comment => {
                        return <CommentCard key={comment.comment_id} comment={comment}/>
                    })}
                </div>
            </ul>
            <Pagination page={page} setPage={setPage} list={comments}/>
        </div>
    )
}