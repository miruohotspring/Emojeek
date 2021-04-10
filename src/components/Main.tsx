import { useEffect, useState } from 'react';
import { MyUser } from '../Interface';
import { API, graphqlOperation } from 'aws-amplify'; 
import { listReactionOnSpecificPost, listPostsSortedByCreatedAt } from '../graphql/queries';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import awsmobile from '../aws-exports';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import gql from 'graphql-tag';

import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';

import { createReaction } from '../graphql/mutations';
import { myquery, myquery2 } from '../graphql/queries';

const client = new AWSAppSyncClient({
    url: awsmobile.aws_appsync_graphqlEndpoint,
    region: awsmobile.aws_appsync_region,
    auth: {
        type: AUTH_TYPE.API_KEY,
        apiKey: awsmobile.aws_appsync_apiKey,
    }
});


export function Main(props: MainProps): JSX.Element {
    const [posts, setPosts] = useState({posts: []});
    const [reactions, setReactions] = useState<PostReaction>({});
    const [pickerState, setPickerState] = useState<PickerState>({ show: false, postId: "", x: 0, y: 0 });
    
    // 記事そのものとリアクションは別のテーブルに保持しているため，別々に取得する必要がある．
    useEffect(() => {
        // 記事の取得
        getPosts();
    }, []);
    
    useEffect(() => {
        // 各記事のリアクションの取得
        posts.posts.forEach((element: any) => {
            getReaction(element.id);
        });
    }, [posts]);
    
    // 記事の取得．取得した記事をposts stateにセットする．
    async function getPosts() {
        const result: any = await client.query({
            query: gql(myquery)
        });
        setPosts({ posts: result.data.listPostsSortedByCreatedAt.items });
    }
    
    // 記事IDからリアクションを取得．reactions stateにセットする．
    async function getReaction(postId: string) {
        var q = myquery2.replace('$postId', postId);
        const res: any = await client.query({
            query: gql(q)
        });
        
        // 各リアクションについて，既に存在していればインクリメント，そうでなければ1をセット
        const tmp: Reaction = {};
        res.data.listReactionOnSpecificPost.items.forEach((reaction: any) => {
            if (reaction.emoji in tmp) {
                tmp[reaction.emoji] = tmp[reaction.emoji] + 1;
            } else {
                tmp[reaction.emoji] = 1;
            }
        });
        setReactions((state) => ({...state, [postId]: tmp}));
    }
    
    async function onPick(emoji: any) {
        const res = await API.graphql(graphqlOperation(createReaction, { input: {
            postId: pickerState.postId,
            emoji: emoji.native,
        }}));
    }
    
    
    function showPost(post: any): JSX.Element {
        function onReaction (event: any) {
            setPickerState({ show: !pickerState.show, postId: post.id, x: event.clientX, y: event.clientY });
        }
        
        return (
            <>
            <Box>
            <Button variant="outlined" fullWidth>
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
            </Button>
            </Box>
            
            <Box>
            {reactions[post.id] && Object.keys(reactions[post.id]).map((e: any) => 
                <Button variant="outlined">{e}{reactions[post.id][e]}</Button>
            )}
            <Button onClick={onReaction}>+</Button>
            { pickerState.show && pickerState.postId === post.id &&
                <div id="overlay" style={{top: pickerState.y, left: pickerState.x}}>
                <Picker onSelect={(emoji: any) => {onPick(emoji)}} /> 
                </div>
            }
            </Box>
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

// ある記事についたリアクションを保持
interface Reaction {
    [emoji: string]: number;
}

// 全ての記事についたリアクションを保持
interface PostReaction {
    [postId: string]: Reaction;
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
