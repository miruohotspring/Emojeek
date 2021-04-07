import { useState, useEffect} from 'react';
import { Redirect, BrowserRouter, Route } from 'react-router-dom';
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';

// design
import { ThemeProvider } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { theme } from './Design';
import './App.css';

// components and interfaces
import { Main, Post, UserProfile, Single, Dashboard } from './components';
import { MyUser } from './Interface';

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

function App(): JSX.Element {
    const [authState, setAuthState] = useState<AuthState>();
    const [user, setUser] = useState<MyUser>();
    
    useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData as MyUser);
        });
    }, []);
    
    useEffect(() => {
        if (authState === undefined) {
            Auth.currentAuthenticatedUser().then(authData => {
                setAuthState(AuthState.SignedIn);
                setUser(authData);
            });
        }
    }, []);
    
    return (
        <>
            <div>
            <ThemeProvider theme={theme}>
            <Button variant='outlined' color="primary" href="/">トップページ</Button>
            <Button variant='outlined' color="primary" href="/post">投稿</Button>
            <Button variant='outlined' color="primary" href="/dashboard">マイページ</Button>
            { authState === AuthState.SignedIn && user && <Button variant='outlined' color='primary' href="/" onClick={() => { signOut() }}>ログアウト</Button> }    
            <BrowserRouter>
                <Route exact path = "/" render={() => <Main user={user}/>} />
                <Route exact path = "/user" component = { UserProfile } />
                <Route exact path = "/:username/:article_id" component = { Single } />
                <Route exact path = "/dashboard" render={() => <Dashboard authState={authState} user={user}/>} />
                <Route exact path = "/post" render={() => <Post authState={authState} user={user}/>} />
            </BrowserRouter>
            </ThemeProvider>
            </div>
        </>
    );
}

export default App;
