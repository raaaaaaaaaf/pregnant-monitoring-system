import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useContext } from 'react';
import { AddFormContext } from '../../../context/AddContext';

export default function Step2Form() {
    const {formData, setFormData} = useContext(AddFormContext);

    // Define the handleInputChange function to update formData
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        VITAL SIGN/ASSESSMENT
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="temp"
            name="temp"
            value={formData.temp}
            onChange={handleInputChange}
            label="Temperature"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="aog"
            name="aog"
            value={formData.aog}
            onChange={handleInputChange}
            label="Assesment of Gestitional Age"
            fullWidth
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="pr"
            name="pr"
            value={formData.pr}
            onChange={handleInputChange}
            label="Pulse Rate"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="fht"
            name="fht"
            value={formData.fht}
            onChange={handleInputChange}
            label="Fundal Height"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="bp"
            name="bp"
            value={formData.bp}
            onChange={handleInputChange}
            label="Blood Pressure"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="pres"
            name="pres"
            value={formData.pres}
            onChange={handleInputChange}
            label="P.R.E.S"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="rr"
            name="rr"
            value={formData.rr}
            onChange={handleInputChange}
            label="Respiration Rate"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="pros"
            name="pros"
            value={formData.pros}
            onChange={handleInputChange}
            label="P.R.O.S"
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}