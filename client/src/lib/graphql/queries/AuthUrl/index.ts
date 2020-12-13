import { from } from "apollo-boost";
import { gql } from 'apollo-boost'

export const AUTH_URL = gql`
  query AuthUrl {
    authUrl
  }
`