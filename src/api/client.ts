import gql from 'graphql-tag';
import apiClient from '@/utils/apollo';
/**
 * @description create new Client
 */
const createClient = (clientName: string) => apiClient.mutate(
    {
        mutation : gql`
        mutation addNewClient ($name: String!){
            createClient(data: { name: $name})
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
        name: clientName,
    },
});

/**
 * @description delete Client
 * @param clientId
 */
const deleteClient = (clientId: string) => apiClient.mutate(
    {
        mutation : gql`
        mutation deleteClientMutation ($id: ID!){
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
        mutation updateClientMutation ($clientID: ID!, $domainID: ID){
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

export default {
    createClient,
    updateClient,
    deleteClient,
};
