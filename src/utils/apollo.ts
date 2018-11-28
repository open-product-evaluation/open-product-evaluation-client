import { ApolloClient } from 'apollo-client';
import { ApolloLink, Observable } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
/* import introspectionQueryResultData from './fragments.json'; */

/**
 * inline fragments
 */
const introspectionQueryResultData = {
    __schema: {
        types: [{
            kind: 'INTERFACE',
            name: 'Question',
            possibleTypes: [
                { name: 'LikeQuestion' },
                { name: 'LikeDislikeQuestion' },
                { name: 'ChoiceQuestion' },
                { name: 'RegulatorQuestion' },
                { name: 'RankingQuestion' },
                { name: 'FavoriteQuestion' },
            ],
        },
        {
            kind: 'INTERFACE',
            name: 'Answer',
            possibleTypes: [
                { name: 'LikeAnswer' },
                { name: 'LikeDislikeAnswer' },
                { name: 'ChoiceAnswer' },
                { name: 'RegulatorAnswer' },
                { name: 'RankingAnswer' },
                { name: 'FavoriteAnswer' },
            ],
        },
        ],
    },
};

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
});

const request = async (operation) => {
    let token = null;
    let headers = {
        headers: {},
    };

    // TODO change currentUser to token
    token = await JSON.parse(localStorage.getItem('currentUser') || '{}').token;

    if (token) {
        headers = {
            headers: {
                authorization: token ? `Bearer ${token}` : null,
            },
        };
    }
    operation.setContext(headers);
};

const requestLink = new ApolloLink((operation, forward) => new Observable((observer) => {
    let handle;
    Promise.resolve(operation)
        .then( (oper) => request(oper))
        .then(() => {
            handle = (forward == null) ? null : forward(operation).subscribe({
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
            });
        })
        .catch(observer.error.bind(observer));

    return () => {
        if (handle) { handle.unsubscribe(); }
    };
}));

export const client = new ApolloClient({
    cache: new InMemoryCache({ fragmentMatcher }),
    link: ApolloLink.from([
        requestLink,
        createUploadLink({
            uri: 'http://localhost:3000',
        }),
    ]),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'network-only',
            errorPolicy: 'ignore',
        },
        query: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all',
        },
    },
});
