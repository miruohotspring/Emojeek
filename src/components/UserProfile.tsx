import { RouteComponentProps } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function UserProfile(props: RouteComponentProps<SingleProps>): JSX.Element {
    const [data, setData] = useState<SingleProps>({username: props.match.params.username});
    
    // on load
    useEffect(() => {
        /* do something */
        setData({username: props.match.params.username});
    }, []);
    
    // on props changes
    useEffect(() => {
        /* do something */
    }, [props]);
    
    return (
        <>
            <h1>{ data ? data.username + "さんの投稿記事" : "loading"  }</h1>
        </>
    );
}

export interface SingleProps  {
    username: string;
}

