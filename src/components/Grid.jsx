import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Stack,
  Pagination,
  PaginationItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  FormControlLabel,
  Box,
  FormGroup,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const Grid = ({
  rowsPerPage,
  columnsState,
  handleColumnVisibilityChange,
  orderBy,
  order,
  data,
  page,
  totalPages,
  handleChangeRowsPerPage,
  handleSort,
  handleChange,
  isEditable,
  setData,
  saveHandler,
  handleAddRow
}) => {



  
  const formatFieldValue = (value, fieldType) => {
    if (fieldType === "date") {
      return new Date(value).toLocaleDateString();
    } else if (fieldType === "currency") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    } else if (fieldType === "number") {
      return value;
    } else {
      return value;
    }
  };
  const handleInputChange = (event, columnId, rowId) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === rowId ? { ...row, [columnId]: event.target.value } : row
      )
    );
  };
  return (
    <Paper sx={{ width: "100%", overflow: "auto" }} elevation={4}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        sx={{ padding: 2 }}
      >
        <FormControl variant="outlined">
          <InputLabel id="rows-per-page-label">Rows per Page</InputLabel>
          <Select
            labelId="rows-per-page-label"
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            label="Rows per Page"
            sx={{ width: 110, height: 40 }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ marginBottom: 2 }}>
          <FormGroup row>
            {columnsState.map((column) => (
              <FormControlLabel
                key={column.id}
                control={
                  <Checkbox
                    checked={column.visible}
                    onChange={() => handleColumnVisibilityChange(column.id)}
                  />
                }
                label={column.label}
              />
            ))}
          </FormGroup>
        </Box>
        {isEditable && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              padding: 1,
              gap: 2,
            }}
          >
            <Button variant="contained" color="success" onClick={handleAddRow}>
              Add Row
            </Button>
          </Box>
        )}
      </Stack>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columnsState
                .filter((column) => column.visible)
                .map((column) => (
                  <TableCell key={column.id}>
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                }}
              >
                {columnsState
                  .filter((column) => column.visible)
                  .map((column) => (
                    <TableCell key={column.id}>
                      {isEditable ? (
                        <TextField
                          value={row[column.id]}
                          onChange={(e) =>
                            handleInputChange(e, column.id, row.id)
                          }
                        />
                      ) : (
                        formatFieldValue(row[column.id], column.fieldType)
                      )}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        spacing={2}
        sx={{ padding: 1, alignItems: "center", marginTop: 3 }}
      >
        <Pagination
          page={page}
          onChange={handleChange}
          count={totalPages}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>
      {isEditable && (
        <Box sx={{ display: "flex", justifyContent: "flex-start", padding: 1 }}>
          <Button variant="outlined" color="primary" onClick={saveHandler}>
            Save
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default Grid;
