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
    ticker: String
    quantity: Int
    purchasePrice: NonNegativeFloat
    created_at: DateTime
    updated_at: DateTime
    }

  type Stock {
    _id: ID
    ticker: String
    previousClosingPrice: NonNegativeFloat
    updatedToday: Boolean
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

  type Trend {
    id: ID
    title: String
    entityNames: [String]
    shareUrl: String
    articles: [Article]
    image: Image
  }

  type Article {
    title: String
  }

  type Image {
    newsUrl: String
    source: String
    imgUrl: String
  }
  
  input TrendInput {
    geo: String! = "US"
    category: String = "all"
  }

  type Query {
    users: [User]
    user(id: ID!): User
    me: User
    assets:[Asset]
    asset(id: ID!): Asset
    portfolios:[Portfolio]
    currentStockPrice(ticker: String!): [String]
    googleTrends(input: TrendInput!): [Trend]
  }

  type Mutation {
    portfolio(userId: ID!): Portfolio
    addUser(username: String, name: String, email: String, password: String): Auth
    login(email: String, password: String): Auth
    addPortfolio(userId: ID): Portfolio
    addAsset(userId: ID, ticker:String, quantity:Int, purchasePrice:NonNegativeFloat): Portfolio
    sellAsset(userId: ID, assetId:ID, quantity:Int, sellPrice:NonNegativeFloat): Portfolio

  }
`;

module.exports = typeDefs;
