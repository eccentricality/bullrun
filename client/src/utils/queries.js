import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
    }
  }
`;

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_GOOGLE_TRENDS = gql`
  query googleTrends($input: TrendInput!) {
    googleTrends(input: $input) {
      id
      title
      entityNames
      shareUrl
      articles {
        title
      }
      image {
        newsUrl
        source
        imgUrl
      }
    }
  }
`;