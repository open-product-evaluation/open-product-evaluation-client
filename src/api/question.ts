import gql from 'graphql-tag';
import apiClient from '@/utils/apollo';

// Mutation Answer ChoiceQuestion
const choiseAnswer = (question: string, choiceID: string) => apiClient.mutate(
    {
        mutation : gql`
        mutation($questionID: HashID!, $choice: HashID){
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

// Mutation Answer LIKEQuestion
const likeAnswer = (question: string, likeID: boolean) => apiClient.mutate(
    {
        mutation : gql`
        mutation($questionID: HashID!, $liked: Boolean){
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

// Mutation Answer LikeDislikeQuestion
const likeDislikeAnswer = (question: string, likeID: boolean) => apiClient.mutate(
    {
        mutation : gql`
        mutation($questionID: HashID!, $liked: Boolean){
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

// Mutation Answer FavoriteQuestion
const favoriteAnswer = (question: string, favoriteID: boolean) => apiClient.mutate(
    {
        mutation : gql`
        mutation($questionID: HashID!, $favoriteItem: HashID){
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

// Mutation Answer RegulatorQuestion
const regulatorAnswer = (question: string, ratingID: number) => apiClient.mutate(
    {
        mutation : gql`
        mutation($questionID: HashID!, $rating: Float){
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
// Mutation Answer RankingQuestion
const rankingAnswer = (question: string, rankingID: [string]) => apiClient.mutate(
    {
        mutation : gql`
        mutation($questionID: HashID!, $rankedItems: [HashID!]){
            setAnswer(data: {
                questionID: $questionID
                rankedItems: $rankedItems
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
            rankedItems: rankingID,
        },
    });
export default {
    choiseAnswer,
    likeAnswer,
    likeDislikeAnswer,
    favoriteAnswer,
    regulatorAnswer,
    rankingAnswer,
};
