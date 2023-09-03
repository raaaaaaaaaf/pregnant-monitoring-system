import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useContext } from 'react';
import { EditFormContext } from '../../../context/EditContext';

export default function Step3Form() {
  const {formData, setFormData} = useContext(EditFormContext);

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
        Final
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="remarks1"
            name="remarks1"
            value={formData.remarks1}
            onChange={handleInputChange}
            label="Td"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="remarks2"
            name="remarks2"
            value={formData.remarks2}
            onChange={handleInputChange}
            label="Laboratory"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="remarks3"
            name="remarks3"
            value={formData.remarks3}
            onChange={handleInputChange}
            label="Chief Complaints"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="remarks4"
            name="remarks4"
            value={formData.remarks4}
            onChange={handleInputChange}
            label="TCB on"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="nurse"
            name="nurse"
            value={formData.nurse}
            onChange={handleInputChange}
            label="Nurse/Midwife"
            fullWidth
            variant="standard"
          />
        </Grid>
        
      </Grid>
    </React.Fragment>
  );
}