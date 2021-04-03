import React, { useState, useEffect} from 'react';
import { Main, UserProfile, Single, Dashboard } from './components';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';
import './App.css';

const initialUserState = {is_set: false, username: ''};

function App(): JSX.Element {
    const [authState, setAuthState] = useState<AuthState>();
    const [user, setUser] = useState<any>();
    
    useEffect(() => {
        onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData);
        });
    }, []);
    
    return authState === AuthState.SignedIn ? (
        <>
            <BrowserRouter>
                <Route exact path = "/" component = { Main } />
                <Route exact path = "/user" component = { UserProfile } />
                <Route exact path = "/:username/:article_id" component = { Single } />
                <Route exact path = "/dashboard" component = { Dashboard } />
            </BrowserRouter>
            <AmplifySignOut />
        </>
    ) : (
        <>
            <BrowserRouter>
                <Route exact path = "/" component = { Main } />
                <Route exact path = "/user" component = { UserProfile } />
                <Route exact path = "/:username/:article_id" component = { Single } />
                <Route exact path = "/dashboard" component = { Dashboard } />
            </BrowserRouter>
        </>
    );
}

export default App;
