import { createContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { makeVar } from "@apollo/client";
import { GET_TRANSACTIONS } from "../../../graphql/queries/getTransactions";

export const getTransactionsData = makeVar({});
export const TransactionsContext = createContext({});

export function TransactionsProvider({ children }) {
  const [page, setPage] = useState(1);
  const { data, ...otherVars } = useQuery(GET_TRANSACTIONS, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      getTransactionsData(data);
    },
  });

  return (
    <TransactionsContext.Provider
      value={{ ...otherVars, data: getTransactionsData, page, setPage }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
