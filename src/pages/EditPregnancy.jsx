import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Step1Form from '../layouts/dashboard/editForm/Step1Form';
import Step2Form from '../layouts/dashboard/editForm/Step2Form';
import Step3Form from '../layouts/dashboard/editForm/Step3Form';
import { useContext, useEffect } from 'react';
import { addDoc, collection, serverTimestamp, doc, updateDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import Swal from 'sweetalert2';
import { EditFormContext } from '../context/EditContext';
import { useNavigate, useParams } from 'react-router-dom';

const steps = ['Pregnant Information', 'Assesment', 'Final'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Step1Form/>
    case 1:
      return <Step2Form/>
    case 2:
      return <Step3Form/>
    default:
      throw new Error('Unknown step');
  }
}

export default function EditPregnancy () {
const [activeStep, setActiveStep] = React.useState(0);
const {formData, setFormData, formId} = useContext(EditFormContext);

const navigate = useNavigate();



const editPregnancy = async (id) => {
    try {
        const pregnancyDoc = doc(db, "pregnancy", id)
        const newData = {
            address: formData.address,
            age: formData.age,
            aog: formData.aog,
            bmi: formData.bmi,
            bp: formData.bp,
            contact: formData.cp, 
            dob: formData.dob,
            edc: formData.edc,
            fh: formData.fh,
            fht: formData.fht,
            height: formData.height,
            husband: formData.husband,
            lmp: formData.lmp,
            name: formData.fullName,
            nurse: formData.nurse,
            philhealth: formData.philhealth,
            pr: formData.pr,
            pres: formData.pres,
            pros: formData.pros,
            remarks1: formData.remarks1,
            remarks2: formData.remarks2,
            remarks3: formData.remarks3,
            remarks4: formData.remarks4,
            rr: formData.rr,
            temp: formData.temp,
            timeStamp: serverTimestamp(),
            weight: formData.weight,
        }
        await updateDoc(pregnancyDoc, newData);
        Swal.fire(
            'Edited!',
            'Information has been edited.',
            'success'
          )
          navigate('/dashboard/user')

    } catch(err) {
        console.error(err);
    }
}

const handleNext = () => {
  setActiveStep(activeStep + 1);
};

const handleBack = () => {
  setActiveStep(activeStep - 1);
};

return (
  <React.Fragment>
    <CssBaseline />
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
         EDIT INDIVIDUAL TREATMENT RECORD
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
            {activeStep === steps.length - 1 ?          
            <Button
                onClick={() => editPregnancy(formId)}
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
              > Save
            </Button> 
            :
            <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              > Next
            </Button>
            }
  
            </Box>
          </React.Fragment>
        )}
      </Paper>
      
    </Container>
  </React.Fragment>
);
}