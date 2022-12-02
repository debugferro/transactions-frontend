import { useContext, useMemo } from "react";
import moment from "moment";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";
import ScrollableTable from "../../../../components/ScrollableTable/ScrollableTable";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { ElementObservabilityProvider } from "../../../../contexts/ElementObservabilityContext";
import { GraySpan } from "./TransactionsTable.styles";
import { ColorfulPill } from "../../../../styles/page.styles";

const columns = [
  {
    label: "Reference",
    id: "reference",
    onRender: (data) => {
      if (data === "") {
        return <GraySpan>No reference provided</GraySpan>;
      } else {
        return <span>{data}</span>;
      }
    },
  },
  {
    label: "Category",
    id: "category.name",
    onRender: (data, row) => {
      const color = row.category?.color;
      const label = data || "Uncategorized";
      return <ColorfulPill color={color}>{label}</ColorfulPill>;
    },
  },
  {
    label: "Date",
    id: "date",
    onRender: (data) => {
      if (data) {
        return moment(data).format("DD/MM/YYYY");
      }
    },
  },
  {
    label: "Amount",
    id: "amount",
    onRender: (data, row) => {
      if (data) {
        return (
          <>
            {data}
            <GraySpan>{row["currency"]}</GraySpan>
          </>
        );
      }
    },
  },
];


function TransactionsTable() {
  const navigate = useNavigate();

  const { data, loading, fetchMore, page, setPage } =
    useContext(TransactionsContext);

  const transactionsData = data().transactions
  const transactions = transactionsData.nodes;
  const hasNextPage = transactionsData.pageInfo.hasNextPage;

  const doFetchMore = () => {
    setPage(page + 1);
    fetchMore({
      variables: { page: page + 1 },
      updateQuery: (prevData, { fetchMoreResult }) => {
        return {
          ...prevData,
          transactions: {
            nodes: [
              ...prevData.transactions.nodes,
              ...fetchMoreResult.transactions.nodes,
            ],
            pageInfo: fetchMoreResult.transactions.pageInfo,
          },
        };
      },
    });
  }

  const debouncedFetchMore = useMemo(
    () => debounce(doFetchMore, 1000), [page]
  );

  return (
    <>
      {transactions && (
        <ElementObservabilityProvider>
          <ScrollableTable
            columns={columns}
            rows={{
              data: transactions,
              props: {
                css: { cursor: "pointer" },
                onClick: (e, row) => navigate(`/transactions/${row.id}`),
              },
            }}
            isAllowedToFetch={!loading && hasNextPage}
            onScroll={debouncedFetchMore}
            page={page}
          />
        </ElementObservabilityProvider>
      )}
    </>
  );
}

export default TransactionsTable;
