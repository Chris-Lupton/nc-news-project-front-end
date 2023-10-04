import { useContext, useState } from "react"
import { UserContext } from "../contexts/user"
import { getUser, postUser } from "../utils/api"

export function LogIn() {
    const { setUser } = useContext(UserContext)
    const [userInputs, setUserInputs] = useState({
        name: "",
        username: "",
        avatar_url: "",
      })
    const [logIn, setLogIn] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingNew, setIsLoadingNew] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [logInErr, setLogInErr] = useState(false)
    const [usernameErr, setUsernameErr] = useState(false)
    const [nameErr, setNameErr] = useState(false)

    function handleSubmit(event) {
      event.preventDefault()
      if(!userInputs.name){
        setNameErr(true)
      }
      if(!userInputs.username){
        setUsernameErr(true)
      }
      if(userInputs.name && userInputs.username){
        setIsLoadingNew(true)
        postUser(userInputs).then((username) => {
          setUser(username)
          setIsLoadingNew(false)
        }).catch((err) => {
          setIsLoadingNew(false)
        })
      }
    }

    function handleChange(event) {
      if(event.target.id === 'name') setNameErr(false)
      if(event.target.id === 'username') setUsernameErr(false)
      setUserInputs((currState) => {
        const copyState = { ...currState }
        copyState[event.target.id] = event.target.value
        return copyState
      })
    }

    function handleChangeLogIn(event) {
      setLogIn(event.target.value)
      if(logInErr) setLogInErr(false)
      if(errorMsg) setErrorMsg('')
    }

    function handleSubmitLogIn(event) {
      event.preventDefault()
      setErrorMsg('')
      setLogInErr(false)

      if(logIn){
        setIsLoading(true)
        getUser(logIn).then(({ username }) => {
          setUser(username)
          setIsLoading(false)
        }).catch((err) => {
          setIsLoading(false)
          setErrorMsg(err.response.data.msg)
        })
      } else {
        setLogInErr(true)
      }
    }

    function guest() {
      setUser('guest')
    }

    return (
      <main>
        <div id="guest">
          <button id='login_btn'onClick={guest} >Continue as guest</button>
        </div>

        <div id="new_user">
          <h4>Sign up as a new user</h4>
          {isLoadingNew ? <div className='loading_box'><div className="mini-loader"></div></div> : 
            <form onSubmit={handleSubmit}>
            <label className='input-box' htmlFor="name">Name *
            <input
              id="name"
              onChange={handleChange}
              value={userInputs.name}
            /></label>
            {nameErr && <p className="error">Please input name</p>}
            <label className='input-box' htmlFor="username">Username *
            <input
              id="username"
              onChange={handleChange}
              value={userInputs.username}
            /></label>
            {usernameErr && <p className="error">Please input username</p>}
            <label className='input-box' htmlFor="avatar_url">Avatar URL
            <input
              id="avatar_url"
              onChange={handleChange}
              value={userInputs.avatar_url}
            /></label>
            <button id='login_btn'>Create account</button>
          </form>}
        </div>

        <div id="login">
          <h4>Sign in</h4>
          { isLoading ? <div className='loading_box'><div className="mini-loader"></div></div> : 
            <form onSubmit={handleSubmitLogIn}>
            <label className='input-box' htmlFor="username">Username
            <input
              id="username"
              onChange={handleChangeLogIn}
              value={logIn}
            /></label>
            {errorMsg && <p className="error">{errorMsg}</p>}
            {logInErr && <p className="error">Please input username</p>}
            <button id="login_btn">Log In</button>
          </form>}
        </div>
      </main>
    )
}