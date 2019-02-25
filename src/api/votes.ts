import gql from 'graphql-tag';
import apiClient from '@/utils/apollo';
/**
 * @description create new Client
 */
const getVotes = (survey: string) => apiClient.query(
    {
        query : gql`
        query getVotes ($surveyID: HashID!){
            votes (surveyID: $surveyID){
            answers{
                question
                __typename
                ...on LikeDislikeAnswer{
                  liked
                }
                ...on LikeAnswer{
                  liked
                }
                ...on ChoiceAnswer{
                  choice
                }
                ...on RegulatorAnswer{
                  rating
                  normalized
                }
                ...on RankingAnswer{
                  rankedItems
                }
                ...on FavoriteAnswer{
                  favoriteItem
                }
            }
            }
          }`,
          variables: {
            surveyID: survey,
          },
});


export default {
  getVotes,
};
