import { Link } from "react-router-dom"
import { useContext} from "react"
import { UserContext } from '../contexts/user'

export function Header () {

  const { user } = useContext(UserContext)

  return (
    <header className="header">
        <Link to="/articles"><h1>NC News</h1></Link>
        <Link className="user">{user}</Link>
        <Link className="log-out">Log out</Link>
    </header>
  )
}