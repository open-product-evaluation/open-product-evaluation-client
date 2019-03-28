import gql from 'graphql-tag';
import apiClient from '@/utils/apollo';

const updateActiveQuestion = (domain: string, question: string) => apiClient.mutate(
    {
        mutation: gql`
        mutation updateActiveQuestion($domainID: HashID!, $questionID: HashID) {
            updateDomain(domainID: $domainID, data: { activeQuestion: $questionID }) {
                domain {
                    activeQuestion {
                        id
                    }
                    }
            }
        }`,
      variables: {
        domainID: domain,
        questionID: question,
      },
    },
);

const onAnswer = (domain: string) => apiClient.subscribe(
    {
      query: gql`
        subscription onAnswer($domainID: HashID!) {
            answerUpdate(domainID: $domainID) {
                changedAttributes
                answer {
                question
                __typename
                ...on LikeAnswer{liked}
                ...on LikeDislikeAnswer{liked}
                ...on ChoiceAnswer{choice}
                ...on RegulatorAnswer{rating}
                ...on RankingAnswer{rankedItems}
                ...on FavoriteAnswer{favoriteItem}
                }
            }
        }`,
      variables: {
        domainID: domain,
      },
    },
);

const onDomainUpdate = (domain: string) => apiClient.subscribe(
    {
      query: gql`
      subscription onDomainUpdate($domainID: HashID!) {
        domainUpdate(domainID: $domainID) {
          changedAttributes
          event
          domain{
            activeQuestion{
              id
            }
          }
        }
      }`,
      variables: {
        domainID: domain,
      },
    },
);

export default {
    updateActiveQuestion,
    onDomainUpdate,
    onAnswer,
};
