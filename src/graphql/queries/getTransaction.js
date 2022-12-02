import { gql } from "@apollo/client";

export const GET_TRANSACTION = gql`
  query GetTransaction($id: String!) {
    transaction(id: $id) {
      id
      amount
      currency
      reference
      date
      category {
        name
        color
      }
      account {
        name
        bank
      }
    }
  }
`;
