import {
  useCallback,
  useRef,
  useLayoutEffect,
  useEffect,
  useContext,
} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { ScrollableTableBody } from "../ScrollableTableBody/ScrollableTableBody";
import { tableContainerCSS } from "./ScrollableTable.styles";
import { ElementObservabilityContext } from "../../contexts/ElementObservabilityContext";

function ScrollableTable({
  columns,
  rows,
  isAllowedToFetch,
  onScroll,
  page = 1,
}) {
  const { elementRef, isVisible } = useContext(ElementObservabilityContext);
  const defaultScroll = () => { };
  const tableEl = useRef();
  const loadMore = useCallback(onScroll || defaultScroll, [rows]);

  const scrollListener = useCallback(() => {
    if (isVisible && isAllowedToFetch) {
      loadMore();
    }
  }, [isAllowedToFetch, loadMore, isVisible]);

  useLayoutEffect(() => {
    const tableRef = tableEl.current;
    tableRef.addEventListener("scroll", scrollListener);
    return () => {
      tableRef.removeEventListener("scroll", scrollListener);
    };
  }, [scrollListener, tableEl]);

  useEffect(() => {
    if (page === 1) {
      tableEl.current.scrollTop = 0;
    }
  }, [page, tableEl]);

  return (
    <>
      <TableContainer
        sx={{ height: "100%" }}
        ref={tableEl}
        css={tableContainerCSS}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.label}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          {rows.data.length >= 1 && (
            <TableBody>
              <ScrollableTableBody columns={columns} rows={rows} />
              {elementRef && isAllowedToFetch && (
                <TableRow>
                  <TableCell>
                    <ArrowDownwardIcon ref={elementRef} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {rows.data.length === 0 && (
        <p css={{ alignSelf: "center" }}>
          No data found for the current configuration.
        </p>
      )}
    </>
  );
}

export default ScrollableTable;
