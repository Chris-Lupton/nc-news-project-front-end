import { Link } from "react-router-dom"
import { useContext} from "react"
import { UserContext } from '../contexts/user'

export function Header () {

  const { user } = useContext(UserContext)

  return (
    <header className="header">
        <Link to="/articles"><h1>NC News</h1></Link>
        <Link>Logged in as: {user}</Link>
    </header>
  )
}