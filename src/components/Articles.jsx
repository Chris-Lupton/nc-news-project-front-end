import { Link } from "react-router-dom"
import { ArticleList } from "./ArticleList"

export function Articles() {

    return (
        <main>
            <Link className="nav">New Article</Link>
            <button className="filters">Filters</button>
            <ArticleList/>
        </main>
    )
}