import { useEffect, useState } from 'react';
import { MyUser } from '../Interface';
import { API, graphqlOperation } from 'aws-amplify'; 
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import awsmobile from '../aws-exports';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import gql from 'graphql-tag';

import {
  Link,
  Box,
  Button,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';

import { createReaction } from '../graphql/mutations';
import { myquery, myquery2 } from '../graphql/queries';

// API_KEYを使ったqueryの送信に使う
const client = new AWSAppSyncClient({
    url: awsmobile.aws_appsync_graphqlEndpoint,
    region: awsmobile.aws_appsync_region,
    auth: {
        type: AUTH_TYPE.API_KEY,
        apiKey: awsmobile.aws_appsync_apiKey,
    },
    disableOffline: true
});

export function Main(props: MainProps): JSX.Element {
    const [posts, setPosts] = useState({posts: []});
    const [reactions, setReactions] = useState<PostReaction>({});
    const [pickerState, setPickerState] = useState<PickerState>({ show: false, postId: "" });
    
    /* 記事そのものとリアクションは別のテーブルに保持しているため，別々に取得する必要がある．*/
    // 記事の取得
    useEffect(() => {
        getPosts();
    }, []);
    
    // 各記事のリアクションの取得
    useEffect(() => {
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
        console.log(q);
        console.log(res);
        
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
            setPickerState({ show: !pickerState.show, postId: post.id });
        }
        
        return (
            <>
            <Box marginBottom="50px">
            <Box width="100%">
            <ListItem>
                <List>
                <ListItem>
                <Typography variant="h4">
                    {post.title}
                </Typography>
                </ListItem>
                <ListItem>
                <Typography>
                    by: <Button href={"/user/" + post.owner}>{post.owner}</Button>
                </Typography>
                </ListItem>
                <ListItem>
                <Typography>
                    {post.content}
                </Typography>
                </ListItem>
                </List>
            </ListItem>
            </Box>
            
            <Box> 
            {reactions[post.id] && Object.keys(reactions[post.id]).map((e: any) => 
                <Button variant="outlined">{e}{reactions[post.id][e]}</Button>
            )}
            <Button variant="outlined" onClick={onReaction}>
                {pickerState.show && pickerState.postId === post.id && <>-</> || <>+</>}
            </Button>
            { pickerState.show && pickerState.postId === post.id &&
                <Box><Picker onSelect={(emoji: any) => {onPick(emoji)}} /></Box>
            }
            </Box>
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
}

interface MainProps {
    user: MyUser | undefined;
}
