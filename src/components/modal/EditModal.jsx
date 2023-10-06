import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function EditModal({ open, onClose, id }) {
  const {userData} = useContext(AuthContext)
  const nav = useNavigate()
  const [date1, setData1] = useState(null);
  const [date2, setData2] = useState(null);
  const [date3, setData3] = useState(null);
  const [isChecked, setIsChecked] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    checkbox6: false,
    checkbox7: false,
    checkbox8: false,
    checkbox9: false,
    checkbox10: false,
  });
  const [formData, setFormData] = useState({
    // Step1
    fullName: "",
    age: "",
    philhealth: "",
    address: "",
    husband: "",
    cp: "",
    // Step 2
    temp: "",
    aog: "",
    pr: "",
    fh: "",
    fht: "",
    bp: "",
    pres: "",
    rr: "",
    pros: "",
    weight: "",
    height: "",
    bmi: "",

    // Step 3
    td: "",
    lab: "",
    chief: "",
  });

  // Define the handleInputChange function to update formData
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDate1Change = (date) => {
    setData1(date);
  };
  const handleDate2Change = (date) => {
    setData2(date);
  };
  const handleDate3Change = (date) => {
    setData3(date);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setIsChecked((prevChecked) => ({
      ...prevChecked,
      [name]: checked,
    }));
  };


  const handleEdit = async (id) => {
    try {
      const pregRef = doc(db, "pregnancy", id);
      const data = {
        address: formData.address,
        age: formData.age,
        aog: formData.aog,
        bmi: formData.bmi,
        bp: formData.bp,
        contact: formData.cp,
        fh: formData.fh,
        fht: formData.fht,
        height: formData.height,
        husband: formData.husband,
        name: formData.fullName,
        philhealth: formData.philhealth,
        pr: formData.pr,
        pres: formData.pres,
        pros: formData.pros,
        td: formData.td,
        lab: formData.lab,
        chief: formData.chief,
        rr: formData.rr,
        temp: formData.temp,
        timeStamp: serverTimestamp(),
        weight: formData.weight,

        //Date Picker
        dob: date1.toDate(),
        lmp: date2.toDate(),
        edc: date3.toDate(),

        //checkbox
        checkbox1: isChecked.checkbox1,
        checkbox2: isChecked.checkbox2,
        checkbox3: isChecked.checkbox3,
        checkbox4: isChecked.checkbox4,
        checkbox5: isChecked.checkbox5,
        checkbox6: isChecked.checkbox6,
        checkbox7: isChecked.checkbox7,
        checkbox8: isChecked.checkbox8,
        checkbox9: isChecked.checkbox9,
        checkbox10: isChecked.checkbox10,
      };
      await updateDoc(pregRef, data);
      Swal.fire("Edited!", "Information has been edited.", "success");
      onClose();
      if (userData.role === "Admin") {
        nav('/dashboard/pregnancy')
      } else {
        nav('/officer/pregnancy')
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Pregnant Information</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid item xs={4}>
            <TextField
              margin="dense"
              required
              id="fullName"
              name="fullName"
              label="Full name"
              value={formData.fullName}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              required
              id="age"
              name="age"
              label="Age"
              value={formData.age}
              onChange={handleInputChange}
              type="number"
              fullWidth
              variant="outlined"
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                sx={{ mt: 1, width: "100%" }}
                value={date1}
                onChange={handleDate1Change}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          {/* Center Column */}
          <Grid item xs={4}>
            <TextField
              margin="dense"
              required
              id="philhealth"
              name="philhealth"
              value={formData.philhealth}
              onChange={handleInputChange}
              label="PHILHEALTH"
              placeholder="XX-XXXXXXXXX-X"
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              required
              id="cp"
              name="cp"
              value={formData.cp}
              onChange={handleInputChange}
              label="Contact No."
              type="number"
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              required
              id="husband"
              name="husband"
              value={formData.husband}
              onChange={handleInputChange}
              label="Husband/Relatives"
              fullWidth
              variant="outlined"
            />
          </Grid>
          {/* Right Column */}
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="LMP"
                sx={{ mt: 1, width: "100%" }}
                value={date2}
                onChange={handleDate2Change}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="EDC"
                sx={{ mt: 1.5, mb: 0.5, width: "100%" }}
                value={date3}
                onChange={handleDate3Change}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <TextField
              margin="dense"
              required
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              label="Address"
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Typography variant="h6">Vital Sign/Assesment</Typography>
        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid item xs={4}>
            <TextField
              margin="dense"
              required
              id="temp"
              name="temp"
              value={formData.temp}
              onChange={handleInputChange}
              label="Temperature"
              type="number"
              placeholder="°C"
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              required
              id="pr"
              name="pr"
              value={formData.pr}
              onChange={handleInputChange}
              label="Pulse Rate"
              type="number"
              placeholder="bpm"
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              required
              id="bp"
              name="bp"
              value={formData.bp}
              onChange={handleInputChange}
              label="Blood Pressure"
              type="number"
              placeholder="mmHg"
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              required
              id="rr"
              name="rr"
              value={formData.rr}
              onChange={handleInputChange}
              label="Respiration Rate"
              type="number"
              placeholder="cpm"
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              required
              id="td"
              name="td"
              value={formData.td}
              onChange={handleInputChange}
              label="Td"
              variant="outlined"
              fullWidth
            />
          </Grid>
          {/* Center Column */}
          <Grid item xs={4}>
            <TextField
              margin="dense"
              required
              id="height"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              label="Height"
              type="number"
              placeholder="cm"
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              required
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              label="Weight"
              type="number"
              placeholder="kg"
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              required
              id="bmi"
              name="bmi"
              value={formData.bmi}
              onChange={handleInputChange}
              label="Body Mass Index"
              type="number"
              placeholder="BMI"
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              required
              id="aog"
              name="aog"
              value={formData.aog}
              onChange={handleInputChange}
              label="Assesment of Gestitional Age"
              type="number"
              placeholder="weeks"
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              required
              id="lab"
              name="lab"
              value={formData.lab}
              onChange={handleInputChange}
              label="Laboratory"
              variant="outlined"
              fullWidth
            />
          </Grid>
          {/* Right Column */}
          <Grid item xs={4}>
            <TextField
              margin="dense"
              required
              id="fh"
              name="fh"
              value={formData.fh}
              onChange={handleInputChange}
              label="Fundal Height"
              type="number"
              placeholder="cm"
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              required
              id="fht"
              name="fht"
              value={formData.fht}
              onChange={handleInputChange}
              label="Fetal Heart Tone"
              type="number"
              placeholder="bpm"
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              required
              id="pres"
              name="pres"
              value={formData.pres}
              onChange={handleInputChange}
              label="P.R.E.Syndrome"
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              required
              id="pros"
              name="pros"
              value={formData.pros}
              onChange={handleInputChange}
              label="P.O.Syndrome"
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              required
              id="chief"
              name="chief"
              value={formData.chief}
              onChange={handleInputChange}
              label="Chief Complaints"
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>

        <Typography variant="h6">Remarks</Typography>
        <FormControl component="fieldset">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="checkbox1"
                  checked={isChecked.checkbox1}
                  onChange={handleCheckboxChange}
                />
              }
              label="Instructed mother to continue taking FeSO4 + Folic Acid 1 tab OD as prescribed."
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="checkbox2"
                  checked={isChecked.checkbox2}
                  onChange={handleCheckboxChange}
                />
              }
              label="Encouraged mother to eat plenty of green leafy vegetables and fruits."
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="checkbox3"
                  checked={isChecked.checkbox3}
                  onChange={handleCheckboxChange}
                />
              }
              label="Instructed to avoid/reduce intake of salty and fatty foods."
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="checkbox4"
                  checked={isChecked.checkbox4}
                  onChange={handleCheckboxChange}
                />
              }
              label="Increase fluid intake. have a glass of milk daily."
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="checkbox5"
                  checked={isChecked.checkbox5}
                  onChange={handleCheckboxChange}
                />
              }
              label="Avoid caffeinated beverages such as coffee and soda."
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="checkbox6"
                  checked={isChecked.checkbox6}
                  onChange={handleCheckboxChange}
                />
              }
              label="Avoid extraneous activity."
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="checkbox7"
                  checked={isChecked.checkbox7}
                  onChange={handleCheckboxChange}
                />
              }
              label="Encouraged to have exercise daily as tolerated (walking for example) and to have enough rest and sleep."
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="checkbox8"
                  checked={isChecked.checkbox8}
                  onChange={handleCheckboxChange}
                />
              }
              label="Provide mother health teachings on the importance of personal hygine, family planning and safe delivery."
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="checkbox9"
                  checked={isChecked.checkbox9}
                  onChange={handleCheckboxChange}
                />
              }
              label="Educated mother on the different danger signs of pregnancy and instruct to report it immediately when experienced."
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="checkbox10"
                  checked={isChecked.checkbox10}
                  onChange={handleCheckboxChange}
                />
              }
              label="Explain to the mother the importance of breastfeeding and proper nutrition for both mother and child."
            />
          </FormGroup>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={() => handleEdit(id)} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditModal;
