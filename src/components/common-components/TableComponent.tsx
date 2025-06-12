import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import type { UsersModel } from "../../configs/models/users.model";

export interface TableProps {
  userData: any[];
  columns: any[];
  onEdit: (row: UsersModel) => void;
  onDelete: (id: string | number) => void;
}

type Order = "asc" | "desc";

const TableComponent: React.FC<TableProps> = ({
  userData,
  columns,
  onEdit,
  onDelete,
  
}) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("");

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleSort = (column: string) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const compare = (a: any, b: any, column: string) => {
    if (a[column] === undefined || b[column] === undefined) return 0;
    if (typeof a[column] === "number" && typeof b[column] === "number") {
      return a[column] - b[column];
    }
    if (typeof a[column] === "string" && typeof b[column] === "string") {
      return a[column].localeCompare(b[column]);
    }
    if (a[column] instanceof Date && b[column] instanceof Date) {
      return a[column].getTime() - b[column].getTime();
    }
    return 0;
  }

  const sortedData = React.useMemo(() => {
    if (!orderBy) return userData;
    return [...userData].sort((a, b) =>
      order === "asc"
        ? compare(a, b, orderBy)
        : compare(b, a, orderBy)
    );
  }, [userData, order, orderBy]);

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div style={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>
                  <TableSortLabel
                    active={orderBy === column}
                    direction={orderBy === column ? order : "asc"}
                    onClick={() => handleSort(column)}
                  >
                    <strong>{column.toUpperCase()}</strong>
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="center">
                <strong>ACTIONS</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData && paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column: string) => (
                    <TableCell key={column}>
                      {column === "avatar" ? (
                        <img
                          src={row[column]}
                          alt="Avatar"
                          style={{ width: 50, height: 50, borderRadius: "50%" }}
                        />
                      ) : column === "creationAt" || column === "updatedAt" ? (
                        new Date(row[column]).toLocaleDateString()
                      ) : (
                        row[column]
                      )}
                    </TableCell>
                  ))}
                  <TableCell style={{ textAlign: "center" }}>
                    <IconButton color={"primary"} onClick={() => onEdit(row)}>
                      <Edit />
                    </IconButton>
                    <IconButton color={"error"} onClick={() => onDelete(row)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={userData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10]}
        />
      </TableContainer>
    </div>
  );
};

export default TableComponent;
