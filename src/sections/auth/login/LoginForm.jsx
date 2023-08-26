import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard', { replace: true });
    } catch(err) {
      console.error(err)
    }

  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
         name="email" 
         label="Email address"
         onChange={(e) => setEmail(e.target.value)} 
         />

        <TextField
          name="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)} 
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={signIn} color="info">
        Login
      </LoadingButton>
    </>
  );
}
