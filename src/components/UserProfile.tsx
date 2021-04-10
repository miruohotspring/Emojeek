// graphqlの諸々

export function UserProfile(user: UserProps): JSX.Element {
    return (
        <>
            <h1>{ user ? user.username + "さんのプロフィール" : "loading"  }</h1>
            <h2>獲得リアクション</h2>
            <h2>投稿記事</h2>
        </>
    );
}

export interface UserProps  {
    username: string | undefined;
}