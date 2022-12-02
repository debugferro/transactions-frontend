import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { accessValueThroughString } from "../../utils/accessValueThroughString";

export function ScrollableTableBody({ columns, rows }) {
  return (
    <>
      {rows.data.map((row) => {
        return (
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.id}
            {...rows.props}
            onClick={
              rows.props.onClick ? (e) => rows.props.onClick(e, row) : null
            }
          >
            {columns.map((column) => {
              let value = accessValueThroughString(row, column.id);
              if (column.onRender) {
                value = column.onRender(value, row);
              }

              return <TableCell key={column.id}>{value}</TableCell>;
            })}
          </TableRow>
        );
      })}
    </>
  );
}
