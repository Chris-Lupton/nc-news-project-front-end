import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getTopics, postArticle } from "../utils/api"
import { UserContext } from "../contexts/user"

export function PostArticle () {

    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [isPosting, setIsPosting] = useState(false)
    const [error, setError] = useState('')
    const [topics, setTopics] = useState([])
    const [inputs, setInputs] = useState({author: user, title: '', body: '', topic: ''})

    useEffect(() => {
      getTopics().then((topicData) => {
        setTopics(topicData)
      })
    }, [])

    function handleSubmit(event) {
      event.preventDefault()
      if (user === 'guest'){
        alert('Please log in before posting a new article')
      } else if (!inputs.title){
        alert('Please input a title')
      } else if (!inputs.body){
        alert('Please input article')
      } else {
          setIsPosting(true)
          postArticle(inputs).then((article) => {
            navigate(`/articles/${article.topic}/${article.article_id}`)
            setIsPosting(false)
          }).catch((err) => {
            setIsPosting(false)
            console.log(err);
            setError(`${err.response.data.msg}`)
        })
      }
    }

    function handleChange(event) {
      setError(false)
      setInputs((currInputs) => {
        const copyInputs = { ...currInputs }
        copyInputs[event.target.id] = event.target.value
        return copyInputs
      })
    }

    if (error) return <p className="error">{error}</p>

    if (isPosting) return <div className="loader"></div>

    return (
      <main className="post-article-box">
        <form className="post-article" onSubmit={handleSubmit}>

        <label id="title-label" htmlFor="title">Title</label>
        <input id='title' onChange={handleChange} value={inputs.title}/>

        <label id="select-label" htmlFor="post-topic">Select topic</label>
        <select id="post-topic" onClick={handleChange}>
          <option></option>
          {topics.map((topic) => {
            return <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
          })}
        </select>

        <label id="topic-label" htmlFor="topic">Add new topic</label>
        <input id='topic' onChange={handleChange} value={inputs.topic}/>

        <label id="article-label" htmlFor="body">Article</label>
        <textarea id="body" onChange={handleChange} value={inputs.body}/>
        <button id="submit-article">Submit</button>
        </form>
      </main>
    )
}