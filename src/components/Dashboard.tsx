import { AmplifyAuthenticator } from '@aws-amplify/ui-react'
import { AuthState } from '@aws-amplify/ui-components';
import { Navigator } from './index';
import { MyUser } from '../Interface';

export function Dashboard(props: DashboardProps) : JSX.Element {
    return props.user && props.authState === AuthState.SignedIn ? (
        <>
            <Navigator />
            <h1>Hello, {props.user.username}</h1>
        </>
    ) : (
        <AmplifyAuthenticator />
    );
}

interface DashboardProps {
    authState: AuthState | undefined;
    user: MyUser | undefined;
}
