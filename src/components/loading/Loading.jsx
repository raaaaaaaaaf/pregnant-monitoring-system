import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import loder from '/assets/loader.gif'
export default function Loading() {
  return (
    <Box sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
     }}>
     <img src={loder} alt='gif'/>
    </Box>
  );
}