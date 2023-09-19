import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SelectYearContext } from "../../context/SelectYearContext";

const SelectYearModal = ({ open, onClose }) => {
  const { selectedYear, setSelectedYear } = useContext(SelectYearContext);

  // Function to handle year selection
  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };
  return (
    <div>
      <Dialog disableEscapeKeyDown open={open} onClose={onClose}>
        <DialogTitle>Select Year</DialogTitle>
        <DialogContent>
         
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Year</InputLabel>
              <Select
                margin="dense"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedYear}
                label="Age"
                onChange={(e) => handleYearSelect(e.target.value)}
                onClose={onClose}
              >
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
                <MenuItem value={2021}>2021</MenuItem>
              </Select>
            </FormControl>
          
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelectYearModal;
