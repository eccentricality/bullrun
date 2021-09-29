const { gql } = require('apollo-server-express');
const { DateTimeTypeDefinition, NonNegativeFloatTypeDefinition } = require('graphql-scalars');

const typeDefs = gql`
  scalar DateTime
  scalar NonNegativeFloat

  type User {
    _id: ID
    username: String
    name: String
    email: String
    password: String
    friends: [User]
    created_at: DateTime
    updated_at: DateTime
  }

  type Asset {
    _id: ID
    name: String
    ticker: String
    quantity: Int
    purchasePrice: NonNegativeFloat
    created_at: DateTime
    updated_at: DateTime
    }

  type Portfolio {
    _id: ID
    user: User
    totalCash: NonNegativeFloat
    totalAssetValue: NonNegativeFloat
    assets: [Asset]
    created_at: DateTime
    updated_at: DateTime
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    me: User
    assets:[Asset]
    asset(id: ID!): Asset
    portfolios:[Portfolio]
    portfolio(id: ID!): Portfolio
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPortfolio(userId: ID): Portfolio
    addAsset(userId: ID, name:String, ticker:String, quantity:Int, purchasePrice:NonNegativeFloat): Portfolio
  }
`;

module.exports = typeDefs;
