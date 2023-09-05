import { Link } from "react-router-dom"
import { ArticleList } from "./ArticleList"
import { useSearchParams } from "react-router-dom"

export function Articles() {

    const [params, setParams] = useSearchParams()
    const topic = params.get("topic")

    return (
        <main>
            <Link className="nav">New Article</Link>
            <button className="filters">Filters</button>
            <ArticleList topic={topic}/>
        </main>
    )
}