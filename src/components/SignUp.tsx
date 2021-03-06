import { useEffect, useState } from 'react';
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

export function SignUp(): JSX.Element {
    const initialInput: SignUpInput = {username: '', password: '', email: ''};
    const initialCode: ConfirmationInput = {username: '', code: '', isSet: false, confirmed: false};
    const [info, setInfo] = useState<SignUpInput>(initialInput); // login info
    const [code, setCode] = useState<ConfirmationInput>(initialCode); // confirmation code
    const history = useHistory();
    
    // each error on TextField
    const initialError: SignUpError = { isSet: false, message: '' };
    const [usernameError, setUsernameError] = useState<SignUpError>(initialError);
    const [passwordError, setPasswordError] = useState<SignUpError>(initialError);
    const [emailError, setEmailError] = useState<SignUpError>(initialError);
    const [defaultError, setDefaultError] = useState<SignUpError>(initialError);
    
    async function signUp() {
        checkForm();
        try {
            const { user } = await Auth.signUp(
                info.username,
                info.password,
                info.email
            );
            setCode({ ...code, username: info.username, isSet: true });
        } 
        catch (error) {
            console.log(error.message);
            handleError(error);
        }
    }
    
    async function confirmSignUp() {
        try {
            await Auth.confirmSignUp(code.username, code.code);
            const user = await Auth.signIn(info.username, info.password);
            history.push("/");
        } catch (error) {
            handleError(error);
            console.log('error confirming sign up', error);
        }
    }
    
    async function resendCode() {
        try {
            await Auth.resendSignUp(code.username);
        } catch (error) {
            handleError(error);
            console.log('error resending confirmation code');
        }
    }
    
    function infoHandleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInfo({ ...info, [e.target.name]: e.target.value });
    }
    
    function codeHandleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setCode({ ...code, [e.target.name]: e.target.value });
    }
    
    function checkForm() {
        setUsernameError(initialError);
        setPasswordError(initialError);
        setEmailError(initialError);
        setEmailError(defaultError);
        if (info.username == '') {
            setUsernameError({
                isSet: true,
                message: '??????????????????????????????????????????'
            });
        }
        if (info.username.length < 4) {
            setUsernameError({
                isSet: true,
                message: '??????????????????4???????????????????????????????????????'
            });
        }
        if (info.password == '') {
            setPasswordError({
                isSet: true,
                message: '??????????????????????????????????????????'
            });
        }
        if (info.email == '') {
            setEmailError({
                isSet: true,
                message: '????????????????????????????????????????????????'
            });
        }
    }
    
    function handleError(e: any) {
            switch (e.log) {
                case 'Username cannot be empty':
                    setUsernameError({
                        isSet: true,
                        message: '??????????????????????????????????????????'
                    });
                    break;
                case 'Password cannot be empty':
                    setPasswordError({
                        isSet: true,
                        message: '??????????????????????????????????????????'
                    });
                    break;
                default:
                    setDefaultError({
                        isSet: true,
                        message: e.message
                    });
                    break;
            }
            switch (e.message) {
                case '1 validation error detected: Value at \'password\' failed to satisfy constraint: Member must have length greater than or equal to 6':
                    setPasswordError({
                        isSet: true,
                        message: '??????????????????6???????????????????????????????????????'
                    });
                    break;
                case 'Invalid email address format.':
                    setEmailError({
                        isSet: true,
                        message: '?????????????????????????????????????????????'
                    });
                    break;
                case 'User already exists':
                    setUsernameError({
                        isSet: true,
                        message: '??????????????????????????????????????????????????????'
                    });
                    break;
                case 'Error creating account':
                    setDefaultError({
                        isSet: true,
                        message: '?????????????????????????????????????????????'
                    });
                    break;
                default:
                    setDefaultError({
                        isSet: true,
                        message: e.message
                    });
                    break;
            }
    }

    return(
        <>
        { !code.isSet && <>
        <Typography variant='h3'>??????????????????</Typography>
        <List>
        <ListItem>
            <ListItemText primary={
            <TextField
            error={usernameError.isSet}
            helperText={usernameError.message}
            label="???????????????"
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
            error={passwordError.isSet}
            helperText={passwordError.message}
            type="password"
            label="???????????????"
            rowsMax="1"
            variant="filled"
            name="password"
            value={info.password}
            onChange={infoHandleChange}
            fullWidth
            margin="normal"
            /> }/>
        </ListItem>
        <ListItem>
            <ListItemText primary={
            <TextField
            error={emailError.isSet}
            helperText={emailError.message}
            label="?????????????????????"
            rowsMax="1"
            variant="filled"
            name="email"
            value={info.email}
            onChange={infoHandleChange}
            fullWidth
            margin="normal"
            /> }/>
        </ListItem>
        <ListItem>
        <ListItemText primary={defaultError.message} />
        </ListItem>
        <ListItem>
            <Button
            variant="outlined"
            color="primary"
            onClick={signUp}
            fullWidth>
            ??????
            </Button>
        </ListItem>
        </List>
        </> }
        
        { code.isSet && !code.confirmed && <>
        <Typography variant='h3'>?????????????????????</Typography>
        <Typography>?????????????????????????????????????????????????????????????????????????????????????????????</Typography>
        <List>
        <ListItem>
            <ListItemText primary={
            <TextField
            label="???????????????"
            rowsMax="1"
            variant="filled"
            name="code"
            value={code.code}
            onChange={codeHandleChange}
            fullWidth
            margin="normal"
            /> }/>
        </ListItem>
        <ListItem>
        <ListItemText primary={defaultError.message}/>
        </ListItem>
        <ListItem>
            <Button
            variant="outlined"
            color="primary"
            onClick={confirmSignUp}
            fullWidth>
            ??????
            </Button>
        </ListItem>
        <ListItem>
            <Button
            variant="outlined"
            color="primary"
            onClick={resendCode}
            fullWidth>
            ??????????????????????????????
            </Button>
        </ListItem>
        </List>
        </> }
        
        </>
    );
    
}


interface SignUpInput {
    username: string;
    password: string;
    email: string;
}

interface ConfirmationInput {
    username: string;
    code: string;
    isSet: boolean;
    confirmed: boolean;
}

interface SignUpError {
    isSet: boolean;
    message: string;
}

