import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { AuthState } from '@aws-amplify/ui-components';
import { MyUser } from '../Interface';

export function Dashboard(props: DashboardProps) : JSX.Element {
    return props.user && props.authState === AuthState.SignedIn ? (
        <>
            <h1>ようこそEmojeekへ, {props.user.username}さん</h1>
            <p>マイページの機能は今後追加される予定です</p>
        </>
    ) : (
        <AmplifyAuthenticator />
    );
}

interface DashboardProps {
    authState: AuthState | undefined;
    user: MyUser | undefined;
}
