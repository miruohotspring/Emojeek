import { useEffect, useState } from 'react';
import { MyUser } from '../Interface';
import { API, graphqlOperation } from 'aws-amplify'; 
import { listReactionOnSpecificPost, listPostsSortedByCreatedAt } from '../graphql/queries';
import GraphQLResult from 'aws-amplify';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

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

import { createReaction } from '../graphql/mutations';


export function Main(props: MainProps): JSX.Element {
    const initialReactionState: { [postId: string]: number } = {};
    
    const [posts, setPosts] = useState({posts: []});
    const [reactions, setReactions] = useState(initialReactionState);
    const [pickerState, setPickerState] = useState<PickerState>({ show: false, postId: "", x: 0, y: 0 });
    
    const getPosts = async () => {
        const res: any = await API.graphql(graphqlOperation(listPostsSortedByCreatedAt, {
            type: "post",
            sortDirection: 'DESC',
            limit: 20,
        }));
        setPosts({ posts: res.data.listPostsSortedByCreatedAt.items });
    }
    
    async function getReaction(postId: string) {
        const res: any = await API.graphql(graphqlOperation(listReactionOnSpecificPost, {
            postId: postId
        }));
        console.log(res);
    }
    
    useEffect(() => {
        getPosts();
    }, []);
    
    
    function showPost(post: any): JSX.Element {
        const onReaction = (event: any) => {
            setPickerState({ show: !pickerState.show, postId: post.id, x: event.clientX, y: event.clientY });
        }
        return (
            <>
            <ListItem>
                <List>
                <ListItem>
                <Typography variant="h4">
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
            <Button onClick={onReaction}>+</Button>
            </>
        );
    }
    
    const onPick = async(emoji: any) => {
        const res = await API.graphql(graphqlOperation(createReaction, { input: {
            postId: pickerState.postId,
            emoji: emoji.native,
        }}));
        getReaction(pickerState.postId);
    }
    
    return (
        <>
            <Typography variant='h3'>Emojeek</Typography>
            { pickerState.show && 
                <div id="overlay" style={{top: pickerState.y, left: pickerState.x}}>
                <Picker onSelect={(emoji: any) => {onPick(emoji)}} /> 
                </div>
            }
            <List>
            {posts.posts.map(post => (
                showPost(post)
            ))}
            </List>
        </>
    );
}

interface Reaction {
    count: number
}

interface PickerState {
    show: boolean;
    postId: string;
    x: number;
    y: number;
}

interface MainProps {
    user: MyUser | undefined;
}
