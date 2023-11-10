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

import { useState } from "react";
import { useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";

const EditProfile = ({ open, onClose, id }) => {
  const [role, setRole] = useState('');

  // Function to handle year selection
  const handleSelect = (role) => {
    setRole(role);
  };

  const handleEdit = async (id) => {
    try {
        const userRef = doc(db, "users", id)
        const data = {
            role: role
        }
        await updateDoc(userRef, data)
        toast.success("Edit was successful.", {
            position: "top-right",
            autoClose: 3000, // Automatically close the toast after 3 seconds
            hideProgressBar: false,
          });
          onClose();
    } catch (err) {
        console.error(err);
    }
  }
  return (
    <div>
      <Dialog disableEscapeKeyDown open={open} onClose={onClose}>
        <DialogTitle>Select Role</DialogTitle>
        <DialogContent>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="select-label">Select Role</InputLabel>
              <Select
                
                labelId="select-label"
                id="demo-simple-select"
                value={role}
                label="Select Year"
                onChange={(e) => handleSelect(e.target.value)}
              >
                <MenuItem value={'Officer'}>Officer</MenuItem>
                <MenuItem value={'Admin'}>Admin</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleEdit(id)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditProfile;
