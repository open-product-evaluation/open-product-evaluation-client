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

//Mutation Answer LIKEQuestion
const likeAnswer = (question: string, likeID: boolean) => apiClient.mutate(
    {
        mutation : gql`
        mutation($questionID: ID!, $liked: Boolean!){
            setAnswer(data: {
                questionID: $questionID
                liked: $liked
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
            liked: likeID,
        },
    });

//Mutation Answer LikeDislikeQuestion
const likeDislikeAnswer = (question: string, likeID: boolean) => apiClient.mutate(
    {
        mutation : gql`
        mutation($questionID: ID!, $liked: Boolean!){
            setAnswer(data: {
                questionID: $questionID
                liked: $liked
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
            liked: likeID,
        },
    });

//Mutation Answer FavoriteQuestion
const favoriteAnswer = (question: string, favoriteID: boolean) => apiClient.mutate(
    {
        mutation : gql`
        mutation($questionID: ID!, $favoriteItem: ID!){
            setAnswer(data: {
                questionID: $questionID
                favoriteItem: $favoriteItem
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
            favoriteItem: favoriteID,
        },
    });

    //Mutation Answer FavoriteQuestion
const regulatorAnswer = (question: string, ratingID: number) => apiClient.mutate(
    {
        mutation : gql`
        mutation($questionID: ID!, $rating: Float!){
            setAnswer(data: {
                questionID: $questionID
                rating: $rating
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
            rating: ratingID,
        },
    });
export default {
    choiseAnswer,
    likeAnswer,
    likeDislikeAnswer,
    favoriteAnswer,
    regulatorAnswer,
};
