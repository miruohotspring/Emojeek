import { useEffect, useState } from 'react';
import { MyUser } from '../Interface';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { RouteComponentProps } from 'react-router-dom';

import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';

// graphqlの諸々
import { API, graphqlOperation } from 'aws-amplify'; 
import { createReaction } from '../graphql/mutations';
import { listReactionOnSpecificOwner, listPostsBySpecificOwner, listPostsSortedByCreatedAt, listReactionOnSpecificPost } from '../queries';
import { client } from '../client';
import gql from 'graphql-tag';

export function Main(props: MainProps): JSX.Element {
    const [user, setUser] = useState<UserProps>();
    const [posts, setPosts] = useState<any[]>([]);
    const [reactions, setReactions] = useState<PostReaction>({});
    const [pickerState, setPickerState] = useState<PickerState>({ show: false, postId: "" });
    const [currentUserReaction, setCurrentUserReaction] = useState<UserPostReaction>({});
    const [userReaction, setUserReaction] = useState<ReactionChild[]>([]);
    
    /* 記事そのものとリアクションは別のテーブルに保持しているため，別々に取得する必要がある．*/
    useEffect(() => {
        if (props.match.params.hasOwnProperty('username')) {
            const v: UserProps = props.match.params as UserProps;
            setUser(v);
            getPostsByUser();
            getUserReaction(v);
        } else {
            getPosts();
        }
    }, [props]);
    
    // 全ての記事についてリアクションを取得
    useEffect(() => {
        posts.forEach((element: any) => {
            getReaction(element.id);
        });
    }, [posts]);
    
    // 記事の取得．取得した記事をposts stateにセットする．
    async function getPosts() {
        const result: any = await client.query({
            query: gql(listPostsSortedByCreatedAt)
        });
        setPosts([...result.data.listPostsSortedByCreatedAt.items]);
    }
    
    // ユーザーの記事一覧を取得
    async function getPostsByUser() {
        if (!user) {
            console.log("user is not set");
        } else {
            var q = listPostsBySpecificOwner.replace('$user', user.username as string);
            var newPosts: any[] = [];
            
            const res: any = await client.query({ query: gql(q) });
            res.data.listPostsBySpecificOwner.items.forEach((post: any) => {
                newPosts.push(post);
            });
            
            setPosts(newPosts);
        }
    }
    
    // 記事IDからリアクションを取得．reactions stateにセットする．
    async function getReaction(postId: string) {
        var q = listReactionOnSpecificPost.replace('$postId', postId);
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
        
        // stateの更新
        setCurrentUserReaction(newUserReactions);
        setReactions((state) => ({...state, [postId]: tmp}));
    }
    
    // ユーザープロフィールに表示する絵文字のカウント
    async function getUserReaction(user: UserProps) {
        var tmp: Reaction = {};
        var q = listReactionOnSpecificOwner.replace('$user', user.username as string);
        const result: any = await client.query({
            query: gql(q)
        });
        result.data.listPostsBySpecificOwner.items.map((post: any) => {
            post.reactions.items.map((e: any) => {
                tmp[e.emoji] = tmp.hasOwnProperty(e.emoji) ? tmp[e.emoji] + 1 : 1;
            });
        });
        
        var sortedArray: ReactionChild[] = [];
        Object.keys(tmp).map((e: string) => {
            sortedArray.push({emoji: e, count: tmp[e]});
        });
        sortedArray.sort((a, b) => (a.count < b.count) ? 1 : -1);
        setUserReaction(sortedArray);
    }    
    
    function showPost(post: any): JSX.Element {
        // 絵文字パレットを表示
        function onReaction (event: any) {
            setPickerState({ show: !pickerState.show, postId: post.id });
        }
        
        // 絵文字パレットから絵文字を押した時の処理(mutationの送信)
        async function onPick(emoji: any) {
            const res = await API.graphql(graphqlOperation(createReaction, { input: {
                postId: pickerState.postId,
                emoji: emoji.native,
            }}));
            incrementCount(emoji.native);
        }
        
        // 直接絵文字を押したときの処理
        async function onPickDirect(e: string) {
            const res = await API.graphql(graphqlOperation(createReaction, { input: {
                postId: post.id,
                emoji: e,
            }}));
            incrementCount(e);
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
            setCurrentUserReaction(newUserReactions);
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
                        <Button onClick={() => onPickDirect(e)} color="primary" variant="outlined">
                        {e}{reactions[post.id][e]}
                        </Button>
                    );
                } else {
                    return( 
                        <Button onClick={() => onPickDirect(e)} variant="outlined">
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
            { user && <h1>{user.username}さんのプロフィール</h1> }
            { user && <h2>獲得リアクション</h2> }
            <Box marginX="36px" marginBottom="50px">
            { userReaction.map(e => <Button variant="outlined">{e.emoji}{e.count}</Button> )}
            </Box>
            { user && <h2>投稿記事</h2> }
            <List>
            { posts.map((post: any) => (showPost(post))) }
            </List>
        </>
    );
}

// ある記事についたリアクションを保持
interface Reaction {
    [emoji: string]: number;
}

// 全部こっちにしてくれ～～～～～～(なお時間なし)
interface ReactionChild {
    emoji: string;
    count: number;
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

interface MainProps extends RouteComponentProps {
    user: MyUser | undefined;
}

interface UserProps  {
    username: string | undefined;
}

// ユーザーがどの記事にどの絵文字をつけているかを保持
interface UserPostReaction {
    [postId: string]: string[];
}
