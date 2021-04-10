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
    const [currentUserReaction, setUserReaction] = useState<UserPostReaction>({});
    
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
        var newUserReactions: UserPostReaction = currentUserReaction;
        newUserReactions[postId] = [];
        
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
            
            // ユーザーがログインしていれば，ユーザーが既に押している絵文字を記録
            if (props.user && props.user.username === reaction.owner && !newUserReactions[postId].includes(reaction.emoji)) {
                newUserReactions[postId].push(reaction.emoji);
            }
        });
        setUserReaction(newUserReactions);
        setReactions((state) => ({...state, [postId]: tmp}));
    }
    
    
    
    function showPost(post: any): JSX.Element {
        // 絵文字パレットを表示
        function onReaction (event: any) {
            setPickerState({ show: !pickerState.show, postId: post.id });
        }
        
        // 絵文字を押した時の処理(mutationの送信)
        async function onPick(emoji: any) {
            const res = await API.graphql(graphqlOperation(createReaction, { input: {
                postId: pickerState.postId,
                emoji: emoji.native,
            }}));
            incrementCount(emoji.native);
        }
        
        // 絵文字を押したときに記事のリアクション数とユーザーのリアクションを更新
        function incrementCount(e: string) {
            var newPostReactions: PostReaction = {...reactions};
            var newUserReactions: UserPostReaction = {...currentUserReaction};
            
            if (!newPostReactions[post.id][e]) {
                newPostReactions[post.id][e] = 1;
            } else {
                newPostReactions[post.id][e] = newPostReactions[post.id][e] + 1;
            }
            newUserReactions[post.id].push(e);
            
            // state更新
            setReactions(newPostReactions);
            setUserReaction(newUserReactions);
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
            
            <Box paddingX="32px"> 
            {reactions[post.id] && Object.keys(reactions[post.id]).map((e: any) => {
                if (currentUserReaction[post.id].includes(e)) {
                    return( 
                        <Button onClick={() => incrementCount(e)} color="primary" variant="outlined">
                        {e}{reactions[post.id][e]}
                        </Button>
                    );
                } else {
                    return( 
                        <Button variant="outlined">
                        {e}{reactions[post.id][e]}
                        </Button>
                    );
                }
            }
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

// 絵文字pickerを表示するためのstate
interface PickerState {
    show: boolean;
    postId: string;
}

// これ要る???
interface MainProps {
    user: MyUser | undefined;
}

// ユーザーがどの記事にどの絵文字をつけているかを保持
interface UserPostReaction {
    [postId: string]: string[];
}
