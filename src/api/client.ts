import gql from 'graphql-tag';
import apiClient from '@/utils/apollo';
/**
 * @description create new Permanent Client
 */
const createPermanentClient = (clientName: string, ownerEmail: string) => apiClient.mutate(
    {
        mutation : gql`
        mutation addNewClient ($name: String!, $email: String!){
            createPermanentClient(data: { name: $name, email: $email})
            {
            client{
                id
                name
                creationDate
            }
            token
            code
        }
    }`,
    variables: {
        name: clientName,
        email: ownerEmail,
    },
});

/**
 * @description create new Temporary Client
 */
const createTemporaryClient = (domainID: string) => apiClient.mutate(
    {
        mutation : gql`
        mutation addNewClient ($domainID: HashID!){
            createTemporaryClient(data: { domainID: $domainID})
            {
            client{
                id
                name
                creationDate
            }
            token
        }
    }`,
    variables: {
        domainID,
    },
});

/**
 * @description login a Permanent Client
 */
const loginClient = (code: string, ownerEmail: string) => apiClient.mutate(
    {
        mutation : gql`
        mutation addNewClient ($code: String!, $email: String!){
            loginClient(data: { code: $code, email: $email})
            {
            client{
                id
                name
                creationDate
            }
            token
            code
        }
    }`,
    variables: {
        code,
        email: ownerEmail,
    },
});

/**
 * @description delete Client
 * @param clientId
 */
const deleteClient = (clientId: string) => apiClient.mutate(
    {
        mutation : gql`
        mutation deleteClientMutation ($id: HashID!){
        deleteClient(clientID: $id){
            status
        }
        }`,
        variables: {
            id: clientId,
        },
    },
);

/**
 * @description connect Client to Domain
 * @param clientId
 * @param domain
 */
const updateClient = (clientId: string, domain: string) => apiClient.mutate(
    { mutation : gql`
        mutation updateClientMutation ($clientID: HashID!, $domainID: HashID){
        updateClient(data:
            {
            domain: $domainID
            }, clientID: $clientID){
            client {
            creationDate
            name
            id
            }
            }
        }`,

        variables: {
            clientID: clientId,
            domainID: domain,
          },
    },
);

/**
 * @description subscribe to client Updates
 * @param clientId
 */
const onClientUpdate = (clientId: string) => apiClient.subscribe(
    { query : gql`
        subscription clientUpdate ($clientID: HashID!){
        clientUpdate(
            clientID: $clientID){
                    event
                    changedAttributes
                    client {
                        domain {
                            id
                        }
                    }
            }
        }`,
        variables: {
            clientID: clientId,
        },
    },
);

export default {
    createPermanentClient,
    updateClient,
    deleteClient,
    createTemporaryClient,
    loginClient,
    onClientUpdate,
};
