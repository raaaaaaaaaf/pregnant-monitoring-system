import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  DateRangePicker,
  SingleInputDateTimeRangeField,
  SingleInputTimeRangeField,
} from "@mui/x-date-pickers-pro";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddStaffModal = ({ open, onClose }) => {
  const [date, setDate] = useState({
    start: null,
    end: null,
  });
  const [time, setTime] = useState({
    start: null,
    end: null,
  });

  const [formData, setFormData] = useState({
    fName: "",
    contact: "",
  });
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (dates) => {
    setDate({
      start: dates[0] || date.start,
      end: dates[1] || date.end,
    });
  };

  const handleTimeChange = (dates) => {
    setTime({
      start: dates[0] || time.start,
      end: dates[1] || time.end,
    });
  };

  const handleAdd = async () => {
    try {
      const staffRef = collection(db, "staff");
      const data = {
        fName: formData.fName,
        contact: formData.contact,
        role: role,
        startDay: date.start.toDate(),
        endDay: date.end.toDate(),
        startTime: time.start.toDate(),
        endTime: time.end.toDate(),
      };

      await addDoc(staffRef, data);
      toast.success("Staff has been added.", {
        position: "top-right",
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false,
      });
      onClose();
      navigate("/dashboard/staff")
    } catch (err) {
      console.error(err);
    }
  };

  console.log(time.start, time.end);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Staff</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              required
              id="fName"
              name="fName"
              value={formData.fName}
              onChange={handleInputChange}
              label="Full Name"
              placeholder="Full Name"
              variant="outlined"
              fullWidth
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <SingleInputTimeRangeField
                label="Time Schedule"
                value={[time.start, time.end]}
                onChange={handleTimeChange}
                sx={{ mt: 1, width: "100%" }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={6}>
            <TextField
              margin="dense"
              required
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              label="Contact No."
              placeholder="Contact No."
              variant="outlined"
              fullWidth
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateRangePicker
                label="Day Schedule"
                value={[date.start, date.end]}
                onChange={handleDateChange}
                sx={{ mt: 1, width: "100%" }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ mt: 1, width: "100%" }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Role"
              onChange={handleChange}
            >
              <MenuItem value={"Doctor"}>Doctor</MenuItem>
              <MenuItem value={"Nurse"}>Nurse</MenuItem>
              <MenuItem value={"Midwife"}>Midwife</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={handleAdd} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStaffModal;
