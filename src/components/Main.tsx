import { Navigator } from './index';
import { MyUser } from '../Interface';

export function Main(props: MyUser): JSX.Element {
    return (
        <>
            <Navigator />
            <h1>Top Page</h1>
            <h1>{props.username}</h1>
        </>
    );
}
