import { useEffect, useState } from 'react';
import { MyUser } from '../Interface';
import { RouteComponentProps } from 'react-router-dom';

// emoji, material-ui
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';

// graphql
import { API, graphqlOperation } from 'aws-amplify'; 
import { createReaction } from '../graphql/mutations';
import { listReactionOnSpecificOwner, listPostsBySpecificOwner, listPostsSortedByCreatedAt, listReactionOnSpecificPost } from '../queries';
import { client } from '../client';
import gql from 'graphql-tag';

export function Main(props: MainProps): JSX.Element {
    const [user, setUser] = useState<MyUser>(); //ログインしてるユーザーの情報
    const [posts, setPosts] = useState<any[]>([]); //表示する記事
    const [reactions, setReactions] = useState<PostReaction>({}); //記事に付けられたリアクション
    const [pickerState, setPickerState] = useState<PickerState>({ show: false, postId: "" }); //絵文字パレットを表示するためのステート
    const [currentUserReaction, setCurrentUserReaction] = useState<UserPostReaction>({}); //ログインしているユーザーが既に付けているリアクション
    const [userReaction, setUserReaction] = useState<ReactionChild[]>([]); //プロフィールページで使用するユーザーが獲得したリアクション
    
    /* 記事そのものとリアクションは別のテーブルに保持しているため，別々に取得する必要がある．*/
    useEffect(() => {
        // /user/$username にアクセスした際にRouterから渡されたユーザー名をチェックし、
        // 記事一覧と獲得リアクションをセット
        if (props.match.params.hasOwnProperty('username')) {
            const u: MyUser = props.match.params as MyUser;
            setUser(u);
            getPostsByUser();
            getUserReaction(u);
        } else {
            getPosts(); //Routerからユーザーがセットされていない=トップページの時は最新記事を取得
        }
    }, [props]);
    
    // 全ての記事についてリアクションを取得
    useEffect(() => {
        posts.forEach((element: any) => {
            getReaction(element.id);
        });
    }, [posts]);
    
    // 最新記事の取得．取得した記事をposts stateにセットする．
    async function getPosts() {
        const result: any = await client.query({
            query: gql(listPostsSortedByCreatedAt)
        });
        setPosts([...result.data.listPostsSortedByCreatedAt.items]);
    }
    
    // ユーザーの記事一覧を取得
    async function getPostsByUser() {
        // ユーザーがセットされていなければ何もしない
        if (!user) {
            console.log("user is not set");
        } else {
            var q = listPostsBySpecificOwner.replace('$user', user.username as string);
            var newPosts: any[] = [];
            
            const res: any = await client.query({ query: gql(q) });
            res.data.listPostsBySpecificOwner.items.forEach((post: any) => {
                newPosts.push(post);
            });
            
            setPosts(newPosts); //記事をセット
        }
    }
    
    // 記事IDからリアクションを取得．reactions stateにセットする．
    async function getReaction(postId: string) {
        var q = listReactionOnSpecificPost.replace('$postId', postId);
        var newUserReactions: UserPostReaction = currentUserReaction;
        newUserReactions[postId] = [];
        
        const res: any = await client.query({ query: gql(q) });
        
        // 各リアクションについて，既に存在していればインクリメント，そうでなければ1をセット
        const tmp: Reaction = {};
        res.data.listReactionOnSpecificPost.items.forEach((reaction: any) => {
            tmp[reaction.emoji] = reaction.emoji in tmp ? tmp[reaction.emoji] + 1 : 1;
            
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
    async function getUserReaction(user: MyUser) {
        var tmp: Reaction = {};
        // クエリを書き換えて送信
        var q = listReactionOnSpecificOwner.replace('$user', user.username);
        const result: any = await client.query({ query: gql(q) });
        
        // 絵文字の個数を数える
        result.data.listPostsBySpecificOwner.items.map((post: any) => {
            post.reactions.items.map((e: any) => {
                tmp[e.emoji] = tmp.hasOwnProperty(e.emoji) ? tmp[e.emoji] + 1 : 1;
            });
        });
        
        // 獲得数で並び替え。これ記事についてるリアクションでもやった方がいい
        // というかPostReactionの要素をReactionChildの配列にしたい（もう遅い）
        var sortedArray: ReactionChild[] = [];
        Object.keys(tmp).map((e: string) => {
            sortedArray.push({emoji: e, count: tmp[e]});
        });
        sortedArray.sort((a, b) => (a.count < b.count) ? 1 : -1);
        setUserReaction(sortedArray);
    }
    
    // 一つの記事を表示する関数。もうanyやめない？ はい・・・
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
            
            newPostReactions[post.id][e] = newPostReactions[post.id][e] ? newPostReactions[post.id][e] + 1 : 1;
            newUserReactions[post.id].push(e);
            
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
                    {new Date(post.createdAt).toLocaleString('ja-JP')}
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

// ToDo: 全部これに変更した方がいい
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

// ユーザーがどの記事にどの絵文字をつけているかを保持
interface UserPostReaction {
    [postId: string]: string[];
}
