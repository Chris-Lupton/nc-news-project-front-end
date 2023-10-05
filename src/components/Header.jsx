import { Link } from "react-router-dom"
import { useContext} from "react"
import { UserContext } from '../contexts/user'

export function Header () {

  const { user, setUser } = useContext(UserContext)

  function logOut() {
    setUser('')
  }

  if(!user || user === 'guest') {
    return (
      <header className="header">
        <Link className='news' to="/articles"><h1>NC News</h1></Link>
        <Link onClick={logOut} to="/" className="log-out">Sign Up</Link>
      </header>
    )
  }

  return (
    <header className="header">
        <Link className='news' to="/articles"><h1>NC News</h1></Link>
        <div>
          <Link to={`/users/${user}`} className="user">{user}</Link>
          <Link onClick={logOut} to="/" className="log-out">Log out</Link>
        </div>
    </header>
  )
}