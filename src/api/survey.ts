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

/**
 * @description get specific survey
 * @param context: ID of chosen Survey conntected to Device
 */
const getSurvey = (context: string) => apiClient.query(
  {
      query : gql`
            query getSurvey ($contextID: ID!){
            context(contextID: $contextID) {
              id
              name
              activeSurvey {
                id
                description
                title
                types
                questions {
                  id
                  description
                  value
                  items {
                    image {
                      url
                      id
                    }
                    label
                  }
                  ... on LikeQuestion {
                    likeIcon {
                      id
                      url
                    }
                  }
                  ... on LikeDislikeQuestion {
                    likeIcon {
                      id
                      url
                    }
                    dislikeIcon {
                      id
                      url
                    }
                  }
                  ... on ChoiceQuestion {
                    choices {
                      id
                      image {
                        url
                      }
                      label
                      code
                    }
                  }
                  ... on RegulatorQuestion {
                    labels {
                      image {
                        url
                      }
                      value
                    }
                    default
                    max
                    min
                    stepSize
                  }
                  items {
                    id
                    image {
                      url
                    }
                    label
                  }
                }
                votes{
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
              }
            }
          }`,
          variables: {
            contextID: context,
          },
});

export default {
  getSurvey,
  getAllSurveys,
};
