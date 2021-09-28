const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    name: String
    email: String
    password: String
    created_at: Date
    updated_at: Date
  }

  type Asset {
    _id: ID
    name: String
    ticker: String
    quantity: Number
    created_at: Date
    updated_at: Date
    }

  type Portfolio {
    _id: ID
    user: User
    assets: [Asset]
    created_at: Date
    updated_at: Date
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
    addPortfolio(userId: ID!): Portfolio
    addAsset(portfolioId: ID!): Asset
  }
`;

module.exports = typeDefs;
