import React, { useEffect, useState } from "react";
import Grid from "./Grid";
import AddModal from "./Modal";

const data = [
  { id: 1, name: "John Doe", amount: 100, created_at: "2023-01-01" },
  { id: 2, name: "Jane Doe", amount: 200, created_at: "2023-01-02" },
  { id: 3, name: "Alice", amount: 300, created_at: "2023-01-03" },
  { id: 4, name: "Bob", amount: 400, created_at: "2023-01-04" },
  { id: 5, name: "Charlie", amount: 500, created_at: "2023-01-05" },
  { id: 6, name: "Daniel", amount: 600, created_at: "2023-01-06" },
  { id: 7, name: "Emily", amount: 700, created_at: "2023-01-07" },
  { id: 8, name: "Frank", amount: 800, created_at: "2023-01-08" },
  { id: 9, name: "Grace", amount: 900, created_at: "2023-01-09" },
  { id: 10, name: "Helen", amount: 1000, created_at: "2023-01-10" },
  { id: 11, name: "Ivan", amount: 1100, created_at: "2023-01-11" },
  { id: 12, name: "Jack", amount: 1200, created_at: "2023-01-12" },
  { id: 13, name: "lala", amount: 1200, created_at: "2023-01-12" },
];
const GridComponent = ({ isEditable, setIsEditable,setNewRowData,newRowData,handleOpenModal,handleCloseModal,openModal }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [columnsState, setColumnsState] = useState([]);

  const loadDataFromLocalStorage = () => {
    const savedData = localStorage.getItem("data");
    return savedData ? JSON.parse(savedData) : data;
  };


  const [Data, setData] = useState(loadDataFromLocalStorage);
  const totalPages = Math.ceil(Data.length / rowsPerPage);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = [...Data].sort((a, b) => {
    if (orderBy === "id") {
      return order === "asc" ? a.id - b.id : b.id - a.id;
    }

    if (orderBy === "name") {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }

    if (orderBy === "amount") {
      return order === "asc" ? a.amount - b.amount : b.amount - a.amount;
    }

    if (orderBy === "created_at") {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    }

    return 0;
  });

  const currentData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChange = (event, value) => {
    setPage(value - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleColumnVisibilityChange = (id) => {
    setColumnsState((prev) =>
      prev.map((column) =>
        column.id === id ? { ...column, visible: !column.visible } : column
      )
    );
  };
  useEffect(() => {
    const fetchColumns = async () => {
      const response = await fetch("/columns.json");
      const columns = await response.json();
      setColumnsState(columns);
    };

    fetchColumns();
  }, []);

  const saveHandler = () => {
    localStorage.setItem("data", JSON.stringify(Data));
    setIsEditable(false);
  };

  const handleSaveRow = () => {
    const newRow = {
      id: Data.length + 1,
      name: newRowData.name,
      amount: Number(newRowData.amount),
      created_at: new Date().toISOString(),
    };

    setData((prevData) => [...prevData, newRow]);
    handleCloseModal();
  };
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(Data));
  }, [openModal]);
  return (
    <>
      <Grid
        handleAddRow={handleOpenModal}
        rowsPerPage={rowsPerPage}
        columnsState={columnsState}
        handleColumnVisibilityChange={handleColumnVisibilityChange}
        orderBy={orderBy}
        order={order}
        data={currentData}
        page={page + 1}
        totalPages={totalPages}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleRequestSort}
        handleChange={handleChange}
        isEditable={isEditable}
        setData={setData}
        saveHandler={saveHandler}
      />
      <AddModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        newRowData={newRowData}
        handleSaveRow={handleSaveRow}
        setNewRowData={setNewRowData}
      />
    </>
  );
};

export default GridComponent;
