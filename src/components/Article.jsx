import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticleById, patchArticle } from "../utils/api"
import { CommentList } from "./CommentList"
import { Link } from "react-router-dom"

export function Article () {

    const [isLoading, setIsLoading] = useState(false)
    const [article, setArticle] = useState({})
    const { article_id } = useParams()
    const [hasVotedUp, setHasVotedUp] = useState('not-voted')
    const [hasVotedDown, setHasVotedDown] = useState('not-voted')

    useEffect(() => {
        setIsLoading(true)
        getArticleById(article_id).then((articleData) => {
            setIsLoading(false)
            setArticle(articleData)
        })
    }, [article_id])

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
        setArticle((currArticle) => {
            const newArticle = {...currArticle}
            newArticle.votes += vote
            return newArticle
        })
        patchArticle(article_id, vote).catch((err) => {
            alert(err.response.data.msg)
        })
    }

    if (isLoading) return <div className="loader"></div>

    return (
        <main className="article">
            <Link className='nav' id="topic">{article.topic}</Link>
            <p id='created_at'>{new Date(article.created_at).toDateString()}</p>
            <Link id='author'>{article.author}</Link>
            <h3>{article.title}</h3>
            <img src={article.article_img_url} alt={`image relating to ${article.topic}`} />
            <p id='body'>{article.body}</p>
            <div className="votes">
                <p id="votes">Votes: {article.votes}</p>
                <button onClick={vote} id='vote-up' className={hasVotedUp}>+</button>
                <button onClick={vote} id='vote-down' className={hasVotedDown}>-</button>
            </div>
            <CommentList article_id={article_id}/>
        </main>
    )
}