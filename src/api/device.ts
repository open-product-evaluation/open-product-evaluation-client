import gql from 'graphql-tag';
import apiClient from '@/utils/apollo';
/**
 * @description create new Device
 */
const createDevice = (deviceName: string) => apiClient.mutate(
    {
        mutation : gql`
        mutation addNewDevice ($name: String!){
            createDevice(data: { name: $name})
            {
            device{
                id
                name
                creationDate
            }
            token
        }
    }`,
    variables: {
        name: deviceName,
      },
});

/**
 * @description delete Device
 * @param deviceId
 */
const deleteDevice = (deviceId: string) => apiClient.mutate(
    {
        mutation : gql`
        mutation deleteDeviceMutation ($id: ID!){
        deleteDevice(deviceID: $id){
            status
        }
        }`,
        variables: {
            id: deviceId,
        },
    },
);

/**
 * @description connect Device to Context
 * @param deviceId
 * @param context
 */
const updateDevice = (deviceId: string, context: string) => apiClient.mutate(
    { mutation : gql`
        mutation updateDeviceMutation ($deviceID: ID!, $contextID: ID){
        updateDevice(data:
            {
            context: $contextID
            }, deviceID: $deviceID){
            device {
            creationDate
            name
            id
            }
            }
        }`,
        // TODO Variable ändern
        variables: {
            deviceID: deviceId,
            contextID: context,
          },
    },
);

export default {
    createDevice,
    updateDevice,
    deleteDevice,
};
