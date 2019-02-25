import { ApolloClient } from 'apollo-client';
import { ApolloLink, Observable } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error'
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
    let headers = {
        headers: {},
    };

    const token = localStorage.getItem('currentToken');

    if (token !== null) {
        headers = {
            headers: {
                authorization: `Bearer ${token}`,
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

const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})

export default new ApolloClient({
    cache: new InMemoryCache({ fragmentMatcher }),
    link: ApolloLink.from([
        errorLink,
        requestLink,
        createUploadLink({
            uri: 'http://localhost:3000/graphql',
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
