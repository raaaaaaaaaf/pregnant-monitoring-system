import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useContext } from 'react';
import { EditFormContext } from '../../../context/EditContext';
import { useEffect } from 'react';
import { addDoc, collection, serverTimestamp, doc, updateDoc, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { useParams } from 'react-router-dom';

export default function Step1Form() {
    const {formData, setFormData} = useContext(EditFormContext);
    const pregnancyCollectionRef = collection(db, "pregnancy")
    const {id} = useParams();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const doc = await getDocs(pregnancyCollectionRef);
          if (doc.exists) {
            const data = doc.data();
            setFormData(data)
          }

        } catch(err){
            console.error(err);
        }
      }
      fetchData();
    }, [id])

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
        Pregnant Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="fullName"
            name="fullName"
            value={formData.fullName || ""}
            onChange={handleInputChange}
            label="Full name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lmp"
            name="lmp"
            value={formData.lmp || ""}
            onChange={handleInputChange}
            label="LMP"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="age"
            name="age"
            value={formData.age || ""}
            onChange={handleInputChange}
            label="Age"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="edc"
            name="edc"
            value={formData.edc || ""}
            onChange={handleInputChange}
            label="EDC"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="dob"
            name="dob"
            value={formData.dob || ""}
            onChange={handleInputChange}
            label="Date of Birth"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="philhealth"
            name="philhealth"
            value={formData.philhealth || ""}
            onChange={handleInputChange}
            label="PHILHEALTH"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            value={formData.address || ""}
            onChange={handleInputChange}
            label="Address"
            fullWidth
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="husband"
            name="husband"
            value={formData.husband || ""}
            onChange={handleInputChange}
            label="Husband/Relatives"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="cp"
            name="cp"
            value={formData.cp || ""}
            onChange={handleInputChange}
            label="Contact No."
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}