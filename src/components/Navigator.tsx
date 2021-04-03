import { Link } from 'react-router-dom'
import { Main } from './Main'
import { UserProfile } from './UserProfile'
import { Single } from './Single'

export function Navigator(): JSX.Element {
    return (
        <>
            <div><Link to = "/">Top Page</Link></div>
            <div><Link to = "/user">User</Link></div>
            <div><Link to = "/miruo/12345">Single</Link></div>
            <div><Link to = "/dashboard">MyPage</Link></div>
        </>
    )
}
