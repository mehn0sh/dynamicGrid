import React, { useEffect, useState, useContext } from "react";
import Grid from "./Grid";
import { PaginationContext } from "../Context/PaginationContext";
import axios from "axios";
import AddModal from "./Modal";

const ServerSidePagination = ({
  isEditable,
  setIsEditable,
  setNewRowData,
  newRowData,
  handleOpenModal,
  handleCloseModal,
  openModal,
}) => {
  const {
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
    setData,
  } = useContext(PaginationContext);
  const [columnsState, setColumnsState] = useState([]);
  const totalPages = Math.ceil(totalCount / rowsPerPage);

  useEffect(() => {
    fetchData(page, rowsPerPage, sortColumn, sortOrder);
  }, [page, rowsPerPage, sortColumn, sortOrder]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchColumns = async () => {
      const response = await fetch("/columns.json");
      const columns = await response.json();
      setColumnsState(columns);
    };

    fetchColumns();
  }, []);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const handleSort = (column) => {
    console.log(column, sortColumn);
    if (sortColumn === column) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleColumnChange = (id) => {
    setColumnsState((prev) =>
      prev.map((column) =>
        column.id === id ? { ...column, visible: !column.visible } : column
      )
    );
  };
  const saveEditHandler = async () => {
    try {
      for (const row of data) {
        await axios.put(`http://localhost:3000/data/${row.id}`, row);
      }
      setIsEditable(false);
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving data to the server:", error);
      alert("Failed to save changes!");
    }
  };
  const handleSaveRow = async () => {
    const newRow = {
      name: newRowData.name,
      amount: Number(newRowData.amount),
      created_at: new Date().toISOString(),
    };
  
    try {
      const response = await axios.post("http://localhost:3000/data", newRow);
  
      if (response.status === 201) {
        const savedRow = response.data;
          setData((prevData) => [...prevData, savedRow]);
  
        handleCloseModal(); 
      }
    } catch (error) {
      console.error("Error saving row:", error);
    }
  };
  return (
    <>
      <Grid
        setPage={setPage}
        totalPages={totalPages}
        page={page}
        data={data}
        rowsPerPage={rowsPerPage}
        columnsState={columnsState}
        handleColumnVisibilityChange={handleColumnChange}
        orderBy={sortColumn}
        order={sortOrder}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        handleChange={handleChange}
        isEditable={isEditable}
        setData={setData}
        saveHandler={saveEditHandler}
        handleAddRow={handleOpenModal}

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

export default ServerSidePagination;
