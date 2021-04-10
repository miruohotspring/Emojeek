import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsmobile from './aws-exports';

// API_KEYを使ったqueryの送信に使う
export const client = new AWSAppSyncClient({
    url: awsmobile.aws_appsync_graphqlEndpoint,
    region: awsmobile.aws_appsync_region,
    auth: {
        type: AUTH_TYPE.API_KEY,
        apiKey: awsmobile.aws_appsync_apiKey,
    },
    disableOffline: true
});
