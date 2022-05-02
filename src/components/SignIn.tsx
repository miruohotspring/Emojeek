import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import {
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    TextField,
} from '@material-ui/core';

export function SignIn(): JSX.Element {
    const initialInput: SignInInput = {username: '', password: ''};
    const initialError: SignInError = {isSet: false, message: ''};
    const [info, setInfo] = useState<SignInInput>(initialInput);
    const [defaultError, setDefaultError] = useState<SignInError>(initialError);
    const history = useHistory();
    
    async function signIn() {
        try {
            const user = await Auth.signIn(info.username, info.password);
            history.push("/");
        } catch (error) {
            handleError(error);
            console.log(error);
        }
    }
    
    function infoHandleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInfo({ ...info, [e.target.name]: e.target.value });
    }
    
    function handleError(e: any) {
        setDefaultError({
            isSet: true,
            message: e.message || e.log
        });
    } 
    
    return (
        <>
        <Typography variant="h3">ログイン</Typography>
        <List>
        <ListItem>
            <ListItemText primary={
            <TextField
            label="ユーザー名"
            rowsMax="1"
            variant="filled"
            name="username"
            value={info.username}
            onChange={infoHandleChange}
            fullWidth
            margin="normal"
            /> }/>
        </ListItem>
        <ListItem>
            <ListItemText primary={
            <TextField
            type="password"
            label="パスワード"
            rowsMax="1"
            variant="filled"
            name="password"
            value={info.password}
            onChange={infoHandleChange}
            fullWidth
            margin="normal"
            /> }/>
        </ListItem>
        <ListItemText primary={defaultError.message}/>
        <ListItem>
            <Button
            variant="outlined"
            color="primary"
            onClick={signIn}
            fullWidth>
            ログイン
            </Button>
        </ListItem>
        </List>
        </>
    );
}

interface SignInInput {
    username: string;
    password: string;
}

interface SignInError {
    isSet: boolean;
    message: string;
}
    