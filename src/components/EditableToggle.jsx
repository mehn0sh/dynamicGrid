import React, { useState } from "react";
import { Box, Switch, FormControlLabel } from "@mui/material";

function EditableToggle({isEditable, setIsEditable}) {

  const handleToggleChange = (event) => {
    setIsEditable(event.target.checked);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <FormControlLabel
        control={
          <Switch
            checked={isEditable}
            onChange={handleToggleChange}
            color="primary"
          />
        }
        label={isEditable ? "Editable Mode" : "Read-Only Mode"}
      />
    </Box>
  );
}

export default EditableToggle;
