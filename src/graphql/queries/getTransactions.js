import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query GetTransactions(
    $reference: String
    $category: String
    $startDate: String
    $page: Int
  ) {
    transactions(
      reference: $reference
      category: $category
      startDate: $startDate
      page: $page
    ) {
      nodes {
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
      pageInfo {
        hasNextPage
        page
      }
    }
  }
`;
