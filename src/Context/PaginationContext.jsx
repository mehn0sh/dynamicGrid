import axios from "axios";
import React, { createContext, useState } from "react";

export const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");


  const fetchData = async (page, rowsPerPage, orderBy, order) => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/data", {
        params: {
          _page: page,
          _limit: rowsPerPage,
          _sort: orderBy,
          _order: order,
        },
      });

      setData(response.data);

      const totalCount = response.headers["x-total-count"]
        ? parseInt(response.headers["x-total-count"], 10)
        : 10;
      setTotalCount(totalCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaginationContext.Provider
      value={{
        data,
        page,
        rowsPerPage,
        totalCount,
        loading,
        setPage,
        setRowsPerPage,
        fetchData,
        sortColumn,
        setSortColumn,
        sortOrder,
        setSortOrder,
        setData
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
