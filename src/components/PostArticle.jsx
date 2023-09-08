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
      if (!inputs.title){
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
      setInputs((currInputs) => {
        const copyInputs = { ...currInputs }
        copyInputs[event.target.id] = event.target.value
        return copyInputs
      })
    }

    if (error) return <p className="error">{error}</p>

    if (isPosting) return <div className="loader"></div>

    return (
        <main className="post-article">
          <form onSubmit={handleSubmit}>
            <div className="title">
              <label htmlFor="title">Title
              <input id='title' onChange={handleChange} value={inputs.title}/></label>
            </div>
            <div className="add-topic">
              <label htmlFor="topic">Select topic
              <select id="topic" onClick={handleChange}>
                <option></option>
                {topics.map((topic) => {
                  return <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
                })}
              </select></label>
            </div>
            <div className="add-topic">
                <label htmlFor="add-topic">Add new topic
                <input id='topic' onChange={handleChange} value={inputs.topic}/></label>
            </div>
            <div className="body">
              <label htmlFor="body">Article
              <textarea id="body" onChange={handleChange} value={inputs.body}/></label>
            <button id="submit-article">Submit</button>
            </div>
          </form>
        </main>
    )
}