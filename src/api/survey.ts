import gql from 'graphql-tag';
import apiClient from '@/utils/apollo';
/**
 * @description create new Client
 */
const getAllSurveys = () => apiClient.query(
    {
        query : gql`
        query getAllSurveys{
            domains(types: [LIKE, LIKEDISLIKE, FAVORITE, REGULATOR, RANKING, CHOICE]) {
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
 * @param domain: ID of chosen Survey conntected to Client
 */
const getSurvey = (domain: string) => apiClient.query(
  {
      query : gql`
            query getSurvey ($domainID: HashID!){
            domain(domainID: $domainID) {
              id
              name
              activeSurvey {
                id
                description
                title
                types
                questions {
                  id
                  type
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
              }
            }
          }`,
          variables: {
            domainID: domain,
          },
});

export default {
  getSurvey,
  getAllSurveys,
};
