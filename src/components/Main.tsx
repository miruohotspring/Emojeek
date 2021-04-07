import { useEffect, useState } from 'react';
import { MyUser } from '../Interface';
import { API, graphqlOperation } from 'aws-amplify'; 
import { listReactionOnSpecificPost, listPostsSortedByCreatedAt } from '../graphql/queries';
import GraphQLResult from 'aws-amplify';

import {
  Button,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  CircularProgress,
} from '@material-ui/core';


export function Main(props: MainProps): JSX.Element {
    const [posts, setPosts] = useState({posts: []});
    
    const getPosts = async () => {
        const res: any = await API.graphql(graphqlOperation(listPostsSortedByCreatedAt, {
            type: "post",
            sortDirection: 'DESC',
            limit: 20,
        }));
        setPosts({ posts: res.data.listPostsSortedByCreatedAt.items });
    }
    
    useEffect(() => {
        getPosts();
        console.log(posts);
    }, []);
    
    function showPost(post: any): JSX.Element {
        return (
            <>
            <ListItem>
                <List>
                <ListItem>
                <Typography>
                    {post.title}
                </Typography>
                </ListItem>
                <ListItem>
                <Typography>
                    {post.owner}
                </Typography>
                </ListItem>
                <ListItem>
                <Typography>
                    {post.content}
                </Typography>
                </ListItem>
                </List>
            </ListItem>
            </>
        );
    }
    
    return (
        <>
            <Typography variant='h3'>Emojeek</Typography>
            <List>
            {posts.posts.map(post => (
                showPost(post)
            ))}
            </List>
        </>
    );
}


interface MainProps {
    user: MyUser | undefined;
}
