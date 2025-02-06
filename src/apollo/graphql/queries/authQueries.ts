import { gql } from "@apollo/client";

export const REFRESH_TOKEN = gql`
  query refreshToken {
    refreshToken {
      accessToken
      user {
        id
      }
    }
  }
`;
