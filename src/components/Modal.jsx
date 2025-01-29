import React from "react";
import { Modal, Box, TextField, Button, Stack } from "@mui/material";
const AddModal = ({
  openModal,
  handleCloseModal,
  newRowData,
  handleSaveRow,
  setNewRowData,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };
  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box sx={style}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            value={newRowData.name}
            onChange={(e) =>
              setNewRowData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <TextField
            label="Amount"
            type="number"
            value={newRowData.amount}
            onChange={(e) =>
              setNewRowData((prev) => ({ ...prev, amount: e.target.value }))
            }
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSaveRow}>
              Save
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddModal;
