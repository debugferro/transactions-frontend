import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: import.meta.env.VITE_APOLLO_SERVER_URI,
  cache: new InMemoryCache({
    typePolicies: {
      Transactions: {
        keyFields: ["nodes", ["id"]],
      },
    },
  }),
});
