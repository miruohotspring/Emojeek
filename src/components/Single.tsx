import { RouteComponentProps } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Single(props: RouteComponentProps<SingleProps>): JSX.Element {
    const [data, setData] = useState<null | Data>(null);
    
    // on load
    useEffect(() => {
        /* do something */
        setData({title: "Untitled", username: props.match.params.username, article_id: props.match.params.article_id});
    }, []);
    
    // on props changes
    useEffect(() => {
        /* do something */
    }, [props]);
    
    return (
        <>
            <h1>{ data ? data.title : "loading"  }</h1>
            <div>created by {data ? data.username : "loading" }</div>
            <div>Article ID: {data ? data.article_id: "loading" }</div>
        </>
    );
}

export interface SingleProps  {
    username: string;
    article_id: string;
}

export interface Data {
    title: string
    username: string;
    article_id: string;
}

