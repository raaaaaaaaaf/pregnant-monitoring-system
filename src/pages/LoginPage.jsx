import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, provider, storage, db } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import {  ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 

// ----------------------------------------------------------------------


const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate()


  const signInWithGoogle = async(e) => {
    e.preventDefault()

    try {
    const res =await signInWithPopup(auth, provider)
    // Get the authenticated user and their photo URL
    const user = auth.currentUser;
    const photoUrl = user.photoURL;

    // Upload the photo to Firebase Storage
    const fileName = `${user.uid}-${new Date().getTime()}`;
    const storageRef = ref(storage, fileName);
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
      const uploadTask = uploadBytes(storageRef, blob);

      // Save the download URL in Firestore
      uploadTask.then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          
          setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: downloadURL
          }, { merge: true });
        });
      });
    };
    xhr.open('GET', photoUrl);
    xhr.send();
    navigate('/dashboard/app')
    } catch(err) {
        console.error(err);
    }
}

  return (
    <>
      <Helmet>
        <title> Login | Patient Information System </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Barangay San Juan Clinic
            </Typography>
            <img src="/assets/illustrations/patient_info.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to Patient Information System
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
              <Link variant="subtitle2">Get started</Link>
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button onClick={signInWithGoogle} fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
