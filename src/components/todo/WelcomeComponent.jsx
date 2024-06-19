import { useParams, Link } from 'react-router-dom'

export default function WelcomeComponent() {

    const { username } = useParams()
    return (
        <div className="WelcomeComponent">
            <h1>Welcome {username} </h1>
            <div>
                To Manage Your Todos: <Link to="/todos">Go here</Link>
            </div>
        </div>
    )
}