import gql from 'graphql-tag';
import apiClient from '@/utils/apollo';
/**
 * @description create new Device
 */
const getAllSurveys = () => apiClient.query(
    {
        query : gql`
        query getAllSurveys{
            contexts(types: [LIKE, LIKEDISLIKE, FAVORITE, REGULATOR, RANKING, CHOICE]) {
              id
              activeSurvey{
                id
                description
                title
              }
            }
          }`,
});

export default {
    getAllSurveys,
};
