import { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

export function Home () {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const [showError, setShowError] = useState(false)
    const [successfull, setSuccessfull] = useState(false)

    if (token !== '') {
        window.localStorage.setItem('token', `Bearer ${ token }`)
        return <Navigate to="/dashboard" />
    }

    function login (e) {
        e.preventDefault()
        axios.post(`http://192.168.1.95:8080/auth/login`, {
            username: username,
            password: password
        })
        .catch(setShowError(true))
        .then((res) => { setShowError(false); setToken(res.data.token); })
    }

    function register (e) {
        e.preventDefault()
        axios.post(`http://192.168.1.95:8080/auth/register`, {
            username: username,
            password: password
        })
        .catch(setSuccessfull(false))
        .then(() => { setSuccessfull(true) })
    }

    return (
        <div id="home" className="container text-center my-5 card">
            { /*<h4 className="my-2">💸 Benvenuto</h4> */ }
            <h4>🏠 Benvenuto</h4>
            <form id="loginForm" className="my-2" onSubmit={ e => e.preventDefault() }>
                <input className="form-control text-center my-2" id="username" placeholder="Username" onChange={ e => setUsername(e.target.value) } />
                <input className="form-control text-center my-2" type="password" id="password" placeholder="Password" onChange={ e => setPassword(e.target.value) } />
                <input type="submit" className="form-control my-2" value="Login" onClick={ e => login(e) } />
                <input type="submit" className="form-control my-2" value="Registrati" onClick={ e => register(e) } />
            </form>
            { showError   ? <div className="alert alert-danger text-center my-2">Username o password sbagliati</div> : null }
            { successfull ? <div className="alert alert-success text-center my-2">Registrazione effettuata con successo</div> : null }
        </div>
    )

}