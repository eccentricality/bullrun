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
    thoughts: [Thought]!
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

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
    me: User
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    assets:[Asset]
    asset(id: ID!): Asset
    portfolios:[Portfolio]
    portfolio(userId: ID!): Portfolio
    currentStockPrice(ticker: String!): [String]
    googleTrends(input: TrendInput!): [Trend]
  }

  type Mutation {
    addUser(username: String, name: String, email: String, password: String): Auth
    login(email: String, password: String): Auth
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    addPortfolio(userId: ID): Portfolio
    addAsset(userId: ID, ticker:String, quantity:Int, purchasePrice:NonNegativeFloat): Portfolio
    sellAsset(userId: ID, assetId:ID, quantity:Int, sellPrice:NonNegativeFloat): Portfolio

  }
`;

module.exports = typeDefs;
