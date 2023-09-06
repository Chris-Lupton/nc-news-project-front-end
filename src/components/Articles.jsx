import { Link } from "react-router-dom"
import { ArticleList } from "./ArticleList"
import { useSearchParams } from "react-router-dom"
import { useState } from "react"
import { Filters } from "./Filters"

export function Articles() {

    const [params, setParams] = useSearchParams()
    const topic = params.get("topic")
    const [isHidden, setIsHidden] = useState('hidden')

    function displayFilters () {
        if(isHidden === 'hidden'){
            setIsHidden('not-hidden')
        }
        if(isHidden === 'not-hidden'){
            setIsHidden('hidden')
        }
    }

    return (
        <main>
            <Link className="nav">New Article</Link>
            <button className="nav" onClick={displayFilters}>Filters</button>
            <span id={isHidden}><Filters setIsHidden={setIsHidden}/></span>
            <ArticleList topic={topic}/>
        </main>
    )
}