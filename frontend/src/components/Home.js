import { useState } from 'react'

export function Home () {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function login (e) {
        e.preventDefault()
        fetch(`http://192.168.1.95:8080/auth/login`, {
            data: {
                username: username,
                password: password
            },
            method: 'POST'
        })
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }

    function register () {

    }

    return (
        <div id="home" className="container text-center my-5 card">
            { /*<h4 className="my-2">💸 Benvenuto</h4> */ }
            <h4>🏠 Benvenuto</h4>
            <form id="loginForm" className="my-2" onSubmit={ e => e.preventDefault() }>
                <input className="form-control text-center my-2" id="username" placeholder="username" onChange={ e => setUsername(e.target.value) } />
                <input className="form-control text-center my-2" type="password" id="password" placeholder="password" />
                <input type="submit" className="form-control my-2" value="Login" onClick={ e => login(e) } />
                <input type="submit" className="form-control my-2" value="Registrati" />
            </form>
        </div>
    )

}