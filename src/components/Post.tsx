import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { AuthState } from '@aws-amplify/ui-components';
import { MyUser } from '../Interface';
import { API, graphqlOperation } from 'aws-amplify';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import { Typography } from '@material-ui/core';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@material-ui/core';

import { createPost } from '../graphql/mutations';

export function Post(props: PostProps) : JSX.Element {
    const initialPostQueryInput = {title: '', content: ''};
    const initialPostQueryInputIsEmpty = {title: true, content: true};
    const [value, setValue] = useState<PostQueryInput>(initialPostQueryInput); //投稿内容
    const [isEmpty, setIsEmpty] = useState<PostQueryInputIsEmpty>(initialPostQueryInputIsEmpty); //文字数のチェック
    const history = useHistory();
    
    // タイトルの文字数チェック
    function titleHandleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue({title: event.target.value, content: value.content});
        if (event.target.value.length > 0 && event.target.value.length < 40) {
            setIsEmpty({title: false, content: isEmpty.content});
        } else {
            setIsEmpty({title: true, content: isEmpty.content});
        }
    }
    
    // 本文の文字数チェック
    function contentHandleChange(e: string) {
        setValue({title: value.title, content: e});
        if (e.length > 0 && e.length < 400) {
            setIsEmpty({title: isEmpty.title, content: false});
        } else {
            setIsEmpty({title: isEmpty.title, content: true});
        }
    }
    
    // 初期に作った部分なのでAPI呼び出しの書き方が古い
    async function onPost() {
        const res = await API.graphql(graphqlOperation(createPost, { input: {
            type: 'post',
            title: value.title,
            content: value.content,
        }}));
        setValue(initialPostQueryInput);
        setIsEmpty(initialPostQueryInputIsEmpty);
        history.push("/");
    }
    
    return props.user && props.authState === AuthState.SignedIn ? (
        <>
            <Typography variant='h3'>記事を投稿する</Typography>
            <List>
                <ListItem key='post-input-title'>
                    <ListItemText primary={
                    <TextField
                    id="post-input-title"
                    label="タイトル"
                    rowsMax="1"
                    variant="filled"
                    value={value.title}
                    onChange={titleHandleChange}
                    fullWidth
                    margin="normal"
                    />
                    }/>
                </ListItem>
                <ListItem key='post-input-content'>
                <Box width={1}> 
                <SimpleMDE onChange={(e: string) => contentHandleChange(e)} />
                </Box>
                </ListItem>
                <ListItem>
                    <Button
                    variant="outlined"
                    color="primary"
                    disabled={isEmpty.title || isEmpty.content}
                    onClick={onPost}
                    fullWidth
                    >
                    投稿する
                    </Button>
                </ListItem>
            </List>
        </>
    ) : (
        <AmplifyAuthenticator />
    );
}

interface PostProps {
    authState: AuthState | undefined;
    user: MyUser | undefined;
}

interface PostQueryInput {
    title: String;
    content: String;
}

interface PostQueryInputIsEmpty {
    title: boolean;
    content: boolean;
}