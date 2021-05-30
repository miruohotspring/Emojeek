import { useState, useEffect} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';

// design
import { ThemeProvider } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { theme } from './Design';
import './App.css';

// components and interfaces
import { Main, Post, UserProfile, Dashboard, SignUp, SignIn } from './components';
import { MyUser } from './Interface';

// サインアウト処理。ログアウトボタンのonClickに使用
async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

// アプリケーション本体
function App(): JSX.Element {
    const [authState, setAuthState] = useState<AuthState>(); //認証情報を保持する
    const [user, setUser] = useState<MyUser>(); // ユーザー名だけを保持する
    
    // ログイン、ログアウトした際にauthState, userをセット
    useEffect(() => {
        return onAuthUIStateChange((nextAuthState: AuthState, authData: any) => {
            setAuthState(nextAuthState);
            setUser(authData as MyUser);
        });
    }, []);
    
    // サインインしている時にauthState, userをセット
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
            { authState === AuthState.SignedIn && user && <Button variant='outlined' color='primary' href="/dashboard">マイページ</Button> }    
            { authState !== AuthState.SignedIn && <Button variant='outlined' color='primary' href="/signin">ログイン</Button> }    
            { authState === AuthState.SignedIn && user && <Button variant='outlined' color='primary' href="/" onClick={() => { signOut() }}>ログアウト</Button> }    
            { authState !== AuthState.SignedIn && <Button variant='outlined' color='primary' href="/signup">ユーザー登録</Button> }    
            <BrowserRouter>
                <Route exact path = "/" render={(props) => <Main user={user} {...props}/>} />
                <Route exact path = "/user" component = { UserProfile } />
                <Route exact path = "/user/:username" render={(props) => <Main user={user} {...props}/>} />
                <Route exact path = "/dashboard" render={() => <Dashboard authState={authState} user={user}/>} />
                <Route exact path = "/post" render={() => <Post authState={authState} user={user}/>} />
                <Route exact path = "/signup" component = { SignUp } />
                <Route exact path = "/signin" component = { SignIn } />
            </BrowserRouter>
            </ThemeProvider>
            </div>
        </>
    );
}

export default App;
