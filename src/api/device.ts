import gql from 'graphql-tag';
import apiClient from '@/utils/apollo';
/**
 * @description create new Device
 */
const createDevice = (deviceName: string) => apiClient.mutate(
    {
        mutation : gql`
        mutation addNewDevice{
            createDevice(data: { name: "${deviceName}"})
            {
            device{
                id
                name
                creationDate
            }
            token
        }
    }`,
});

/**
 * @description delete Device
 * @param deviceId
 */
const deleteDevice = (deviceId: string) => apiClient.mutate(
    {
        mutation : gql`
        mutation deleteDeviceMutation{
        deleteDevice(deviceID: "${deviceId}"){
            status
        }
        }`,
    },
);

/**
 * @description connect Device to Context
 * @param deviceId
 * @param context
 */
const updateDevice = (deviceId: string, context: string) => apiClient.mutate(
    { mutation : gql`
        mutation updateDeviceMutation{
        updateDevice(data:
            {
            context: "${context}"
            }, deviceID: "${deviceId}"){
            device {
            name
            id
            creationDate
            }
            }
        }`,
    },
);

export default {
    createDevice,
    updateDevice,
    deleteDevice,
};
