import { gql } from "@apollo/client";

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($id: String!, $categoryId: String) {
    transaction(id: $id, categoryId: $categoryId) {
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
