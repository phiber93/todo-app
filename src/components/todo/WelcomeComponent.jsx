import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { retrieveHelloWorldPathVariable } from './api/HelloWorldApiService'
import { useAuth } from './security/AuthContext'

export default function WelcomeComponent() {

    const { username } = useParams()

    const [message, setMessage] = useState(null)

    const authContext = useAuth()

    function callHelloWorldRestApi() {
        retrieveHelloWorldPathVariable(username, authContext.token)
            .then((response) => successfullResponse(response))
            .catch((error) => errorResponse(error))
    }

    function successfullResponse(response) {
        setMessage(response.data.message)
    }

    function errorResponse(error) {
        console.log(error)
    }

    return (
        <div className="WelcomeComponent">
            <h1>Welcome {username} </h1>
            <div>
                To Manage Your Todos: <Link to="/todos">Go here</Link>
            </div>
            <div >
                <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>Call Hello World</button>
            </div>
            <div className="text-info">{message}</div>
        </div>
    )
}