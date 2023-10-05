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
        let url = `/articles`
        if (filters.topic) url += `/${filters.topic}`
        url += '?'
        if (filters.sort_by) url += `sort_by=${filters.sort_by}&`
        if (filters.order) url += `order=${filters.order}`
        navigate(url)
    }

    function handleFilters (event) {
        setFilters((currFilters) => {
            const newFilters = {...currFilters}
            newFilters[event.target.id] = event.target.value
            return newFilters
        })
    }

    return (
        <div id="filter-box">  
            <label htmlFor="topic_filter">Select topic
            <select onClick={handleFilters} id="topic_filter">
                <option value="">All topics</option>
                {topics.map((topic) => {
                    return (
                        <option key={topic.slug} value={topic.slug}>
                    {topic.slug}
                    </option>
                );
            })}
            </select>
            </label>
            <label htmlFor="sort_by">Sort articles by
            <select onClick={handleFilters} id="sort_by">
                <option value="created_at">Date</option>
                <option value="comment_count">Comment count</option>
                <option value="votes">Votes</option>
            </select>
            </label>
            <label htmlFor="order">Order articles
            <select onClick={handleFilters} id="order">
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
            </select></label>
            <button id='filter-button' onClick={handleClick}>Select</button>
        </div>
    )
}