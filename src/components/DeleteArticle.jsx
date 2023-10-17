import { useState } from "react"
import { deleteArticle } from "../utils/api"

export function DeleteArticle ({ article }) {

    const [articleDeleting, setArticleDeleting] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)

    function handleDelete (event) {   
        event.preventDefault()   
        setIsError(false)
        setArticleDeleting(true)
        setIsDeleted(false)
        deleteArticle(article.article_id).then(() => {
            setArticleDeleting(false)
            setIsDeleted(true)
    
        }).catch(() => {
            setArticleDeleting(false)
            setIsError(true)
        })
    }
    
    if(articleDeleting) return <button className="delete"><div className="mini-loader"></div></button> 
    
    if(isError) return <p>Could not delete article</p>

    if(isDeleted) return <p>Article deleted</p>

    if(!isDeleted) return <button onClick={handleDelete} className="delete">Delete article</button>
}