import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        token
        user {
            _id
            username
        }
    }
`;

const SAVE_BOOK = gql`
    mutation saveBook($book: saveBookInput) {
        saveBook(book: $book) {
            _id
            username
            email
            savedBooks {
                authors
                title
                description
                link
                image
                bookId
            }
        }
    }
`;

const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            savedBooks {
                authors
                title
                description
                link
                image
                bookId
            }        
        }
    }
`;
