import { gql } from "apollo-server-express";

const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            
        }
    }`;

const ADD_USER = gql``;

const SAVE_BOOK = gql``;

const REMOVE_BOOK = gql``;
