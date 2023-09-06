import { useNavigate } from "react-router-dom"
import { getTopics } from "../utils/api"
import { useEffect, useState } from "react"

export function Filters ({ setIsHidden }) {

    const navigate = useNavigate()
    const [topics, setTopics] = useState([])
    const [filters, setFilters] = useState({topic: '', sort_by:'', order: '', limit: 0})

    useEffect(() => {
      getTopics().then((topicData) => {
        setTopics(topicData)
      })
    }, [])

    function handleClick(event) {
        event.preventDefault()
        setIsHidden('hidden')
        let url = `/articles?`
        if (filters.topic) url += `topic=${filters.topic}`
        navigate(url)
    }

    function setTopic (event) {
        setFilters((currFilters) => {
            const newFilters = {...currFilters}
            newFilters.topic = event.target.value
            return newFilters
        })
    }

    return (
        <div>  
            <select onClick={setTopic} id="topics">
                <option value="">All topics</option>
                {topics.map((topic) => {
                    return (
                        <option key={topic.slug} value={topic.slug}>
                    {topic.slug}
                    </option>
                );
            })}
            </select>
            <button id='filter-button' onClick={handleClick}>Select</button>
        </div>
    )
}