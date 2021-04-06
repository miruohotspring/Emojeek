import { Link } from 'react-router-dom'

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
