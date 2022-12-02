import { BrowserRouter, Routes, Route } from "react-router-dom";
import TransactionsIndex from "./pages/TransactionsIndex/TransactionsIndex";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TransactionsIndex />} />
      </Routes>
    </BrowserRouter>
  );
}
