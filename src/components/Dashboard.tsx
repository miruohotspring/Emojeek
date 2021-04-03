import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { useState, useEffect } from 'react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import Amplify, { Auth } from 'aws-amplify';
import { Navigator } from './Navigator';

export function Dashboard() : JSX.Element {
    const [user, setUser] = useState<any>();
    const [authState, setAuthState] = useState<AuthState>();
    
    useEffect(() => {
        onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData);
        });
        async function init() {
            const currentUser = await Auth.currentAuthenticatedUser();
            setUser( {username: currentUser.username} );
        }
        init();
    }, []);
    
    return user ? (
        <>
            <Navigator />
            <h1>Hello, {user.username}</h1>
        </>
    ) : (
        <AmplifyAuthenticator>
        </AmplifyAuthenticator>
    );
}

