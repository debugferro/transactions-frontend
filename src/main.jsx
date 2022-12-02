import React from "react";
import ReactDOM from "react-dom/client";
import { Global } from "@emotion/react";
import { GlobalStyle } from "./styles/global";
import { AppRoutes } from "./AppRoutes";
import { ApolloProvider } from "@apollo/client";
import { client } from "./services/transactions_backend/client";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Global styles={GlobalStyle} />
    <ApolloProvider client={client}>
      <AppRoutes />
    </ApolloProvider>
  </React.StrictMode>
);
