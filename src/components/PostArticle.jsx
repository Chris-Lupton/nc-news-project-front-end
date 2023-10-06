import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getTopics, postArticle } from "../utils/api"
import { UserContext } from "../contexts/user"

export function PostArticle () {

    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [isPosting, setIsPosting] = useState(false)
    const [topics, setTopics] = useState([])
    const [inputs, setInputs] = useState({author: user, title: '', body: '', topic: ''})

    const [titleErr, setTitleErr] = useState('')
    const [topicErr, setTopicErr ] = useState('')
    const [articleErr, setArticleErr] = useState('')    
    
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
        setTitleErr(true)
      } else if (!inputs.topic){
        setTopicErr(true)
      } else if (!inputs.body){
        setArticleErr(true)
      } else {
          setIsPosting(true)
          postArticle(inputs).then((article) => {
            navigate(`/articles/${article.topic}/${article.article_id}`)
            setIsPosting(false)
          }).catch((err) => {
            setIsPosting(false)
            alert('Something went wrong... Please try again')
        })
      }
    }

    function handleChange(event) {
      setTitleErr(false)
      setTopicErr(false)
      setArticleErr(false)
      setInputs((currInputs) => {
        const copyInputs = { ...currInputs }
        copyInputs[event.target.id] = event.target.value
        return copyInputs
      })
    }

    function handleTopic(event) {
      setTopicErr(false)
      setInputs((currInputs) => {
        const copyInputs = { ...currInputs }
        copyInputs.topic = event.target.value
        return copyInputs
      })
    }

    if (isPosting) return (
      <>
        <p>Posting your article...</p>
        <div className="loader"></div>
      </>
    )

    return (
      <main className="post-article-box">
        <form className="post-article" onSubmit={handleSubmit}>

        <label id="title-label" htmlFor="title">Title</label>
        <input id='title' onChange={handleChange} value={inputs.title}/>
        {titleErr && <p className="error">Please input title</p>}

        <label id="select-label" htmlFor="post-topic">Select topic</label>
        <select id="post-topic" onClick={handleTopic}>
          <option value={inputs.topic} >{inputs.topic}</option>
          {topics.map((topic) => {
            return <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
          })}
        </select>

        <label id="topic-label" htmlFor="topic">Add new topic</label>
        <input id='topic' onChange={handleChange} value={inputs.topic}/>
        {topicErr && <p className="error">Please input topic</p>}

        <label id="article-label" htmlFor="body">Article</label>
        <textarea id="body" onChange={handleChange} value={inputs.body}/>
        {articleErr && <p className="error">Please input article</p>}

        <button id="submit-article">Submit</button>
        </form>
      </main>
    )
}