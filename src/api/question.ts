import gql from 'graphql-tag';
import apiClient from '@/utils/apollo';

//Mutation Answer ChoiceQuestion
const choiseAnswer = (question: string, choiceID: string) => apiClient.mutate(
    {
        mutation : gql`
        mutation($questionID: ID!, $choice: ID!){
            setAnswer(data: {
                questionID: $questionID
                choice: $choice
            }){
                __typename
                answer{
                    __typename
                    question
                }
            }
        }`,
        variables: {
            questionID: question,
            choice: choiceID,
        },
    });

export default {
    choiseAnswer,
};
