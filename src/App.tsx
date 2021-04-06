import { useState, useEffect} from 'react';
import { Main, UserProfile, Single, Dashboard } from './components';
import { MyUser } from './Interface';
import { BrowserRouter, Route } from 'react-router-dom';
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';
import './App.css';

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
            <BrowserRouter>
                <Route exact path = "/" render={() => <Main username="hoge"/>} />
                <Route exact path = "/user" component = { UserProfile } />
                <Route exact path = "/:username/:article_id" component = { Single } />
                <Route exact path = "/dashboard" render={() => <Dashboard authState={authState} user={user}/>} />
            </BrowserRouter>
            { authState === AuthState.SignedIn && user && <AmplifySignOut /> }    
        </>
    );
}

export default App;
