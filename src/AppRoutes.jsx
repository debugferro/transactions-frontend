import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transaction from "./pages/Transaction/Transaction";
import TransactionsIndex from "./pages/TransactionsIndex/TransactionsIndex";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TransactionsIndex />} />
        <Route path="/transactions/:id" element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  );
}
