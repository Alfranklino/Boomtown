const { gql } = require("apollo-server-express");

module.exports = gql`
  #   Query, Mutation, Subscription
  type Query {
    # getUserProfile(user_id: Int!): User!
    getUserProfile: User!
    listAllItems: [Item]!
    # listMyItems(user_id: Int!): [Item]!
    listMyItems: [Item]!
    listMyItemsByStatus(statusInfo: String!): [Item]!
    # listBorrowedByMeItems(user_id: Int!): [Item]!
    test: String
    getUsers: [User]!
  }

  type Mutation {
    signup(signupInfo: SignupInput!): User!
    login(logInfo: LoginInput!): User!
    loginByEmail(logInfo: LoginByEmailInput!): User!
    logout(logoutInfo: LogoutInput!): User!
    logoutAllUsers: [User]!
    logoutExtended(logoutInfo: LogoutInput!): User!
    updateProfile(updateProfInfo: UpdateProfileInput!): User!

    postItem(itemInfo: PostItemInput!): Item!
    borrowItem(borrowInfo: BorrowItemInput!): Item!
    returnItem(returnInfo: ReturnItemInput!): Item!
  }

  #   Main Customs Types

  type User {
    id: ID!
    name: String!
    password: String!
    email: String!
    location: String
    date_of_birth: String
    status: String
    date_created: String
  }

  type Item {
    id: ID!
    name: String!
    description: String
    quantity: Int
    duration: Int
    status: String
    owner_id: Int
    borrower_id: Int
  }

  # Main Inputs
  input SignupInput {
    name: String!
    password: String!
    email: String!
    location: String
    date_of_birth: String
  }

  input LoginInput {
    name: String!
    password: String!
  }

  input LoginByEmailInput {
    email: String!
    password: String!
  }

  input LogoutInput {
    id: ID
    name: String
    password: String
  }

  input UpdateProfileInput {
    email: String!
    name: String
    password: String
    location: String
    date_of_birth: String
  }

  input PostItemInput {
    name: String!
    description: String!
    quantity: Int
    duration: Int
    owner_id: Int
  }

  input BorrowItemInput {
    id: ID!
    name: String
    borrower_id: Int
  }

  input ReturnItemInput {
    id: ID!
    name: String
    borrower_id: Int
  }
`;
