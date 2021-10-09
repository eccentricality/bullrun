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

export const LOGIN_USER = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
