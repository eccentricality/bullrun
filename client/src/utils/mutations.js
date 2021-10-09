import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser(
    $email: String
    $name: String
    $password: String
    $username: String
  ) {
    addUser(
      name: $name
      email: $email
      password: $password
      username: $username
    ) {
      token
    }
  }
`;

export const ADD_PORTFOLIO = gql`
  mutation addPortfolio($userId: ID) {
    addPortfolio(userId: $userId) {
      totalCash
      totalAssetValue
      assets {
        ticker
        quantity
        purchasePrice
      }
    }
  }
`;

export const QUERY_PORTFOLIO = gql`
  mutation portfolio($userId: ID!) {
    portfolio(userId: $userId) {
      totalCash
      totalAssetValue
      assets {
        ticker
        quantity
        purchasePrice
        _id
      }
    }
  }
`;

export const ADD_ASSET = gql`
  mutation addAsset(
    $userId: ID,
    $ticker: String,
    $quantity: Int,
    $purchasePrice: NonNegativeFloat
  ) {
    addAsset(
      userId: $userId,
      ticker: $ticker,
      quantity: $quantity,
      purchasePrice: $purchasePrice
    ) {
      totalCash,
      totalAssetValue,
      assets {
        ticker,
        quantity,
        purchasePrice
        _id
      }
    }
  }
`;

export const SELL_ASSET = gql`
  mutation sellAsset(
    $userId: ID,
    $assetId: ID,
    $quantity: Int,
    $sellPrice: NonNegativeFloat
  ) {
    sellAsset(
      userId: $userId,
      assetId: $assetId,
      quantity: $quantity,
      sellPrice: $sellPrice
    ) {
      totalCash,
      totalAssetValue,
      assets {
        ticker,
        quantity,
        purchasePrice
        _id
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!, $userId: ID!) {
    addThought(thoughtText: $thoughtText, userId: $userId) {
      _id
      thoughtText
      user{
      _id
      username
      }
      created_at
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment(
    $thoughtId: ID!
    $commentText: String!
    $userId: ID!
  ) {
    addComment(
      thoughtId: $thoughtId
      commentText: $commentText
      userId: $userId
    ) {
      _id
      thoughtText
      user{
        _id
      }
      created_at
      comments {
        _id
        commentText
        created_at
      }
    }
  }
`;
