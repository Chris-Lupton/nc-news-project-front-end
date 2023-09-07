import { Link, useParams, useSearchParams } from "react-router-dom"
import { ArticleList } from "./ArticleList"
import { useState } from "react"
import { Filters } from "./Filters"

export function Articles() {

    const [params, setParams] = useSearchParams()
    const sort_by = params.get("sort_by")
    const order = params.get("order")
    const { topic } = useParams()

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
            <div className="button-box">
                <Link className="nav">New Article</Link>
                <button className="nav" onClick={displayFilters}>Filters</button>
            </div>
            <span id={isHidden}><Filters setIsHidden={setIsHidden}/></span>
            <ArticleList topic={topic} sort_by={sort_by} order={order}/>
        </main>
    )
}