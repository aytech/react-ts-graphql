import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Booking {
    id: ID!
    listing: Listing!
    tenant: User!
    checkIn: String!
    checkOut: String!
  }

  type Bookings {
    total: Int!
    result: [Booking!]!
  }

  enum ListingType {
    APARTMENT
    HOUSE
  }

  enum ListingFilter {
    PRICE_LOW_TO_HIGH
    PRICE_HIGH_TO_LOW
  }

  type Listing {
    id: ID!
    title: String!
    description: String!
    image: String!
    host: User!
    type: ListingType!
    address: String!
    city: String!
    country: String!
    admin: String!
    bookings(limit: Int!, page: Int!): Bookings
    bookingsIndex: String!
    price: Int!
    numOfGuests: Int!
  }

  type Listings {
    region: String
    total: Int!
    result: [Listing!]!
  }

  type User {
    id: ID!
    name: String!
    avatar: String!
    contact: String!
    hasWallet: Boolean!
    income: Int
    bookings(limit: Int!, page: Int!): Bookings
    listings(limit: Int!, page: Int!): Listings!
  }

  type Viewer {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }
  
  input LogInInput {
    code: String!
  }

  input ConnectStripeInput {
    code: String!
  }
  
  type Query {
    authUrl: String!
    user(id: ID!): User!
    listing(id: ID!): Listing!
    listings(
      location: String, 
      filter: ListingFilter!, 
      limit: Int!, 
      page: Int!
    ): Listings!
  }

  type Mutation {
    connectStripe(input: ConnectStripeInput!): Viewer!
    disconnectStripe: Viewer!
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
  }
`