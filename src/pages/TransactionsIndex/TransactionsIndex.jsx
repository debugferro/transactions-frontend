import TransactionsTable from "./components/TransactionsTable/TransactionsTable";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { TransactionsProvider } from "./contexts/TransactionsContext";
import { TableContainer } from "./TransactionsIndex.styles";
import { PageContainer } from "../../styles/page.styles";

function TransactionsIndex() {
  return (
    <PageContainer>
      <TableContainer>
        <TransactionsProvider>
          <SearchBar />
          <TransactionsTable />
        </TransactionsProvider>
      </TableContainer>
    </PageContainer>
  );
}

export default TransactionsIndex;
