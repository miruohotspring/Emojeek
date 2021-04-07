import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

export function Navigator(): JSX.Element {
    return (
        <>
            <Button variant='outlined' color="primary" href="/">トップページ</Button>
            <Button variant='outlined' color="primary" href="/post">投稿</Button>
            <Button variant='outlined' color="primary" href="/dashboard">マイページ</Button>
        </>
    )
}
