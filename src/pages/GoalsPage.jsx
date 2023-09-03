import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function GoalsPage() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Major Goals of Prenatal Care
        </Typography>
        <Typography variant="h5" align="" color="text.secondary" component="p">
         1. Ensure a safe birth for mother and child by promoting good health and reducing risk factor.
        </Typography>
        <Typography variant="h5" align="" color="text.secondary" component="p">
         2. Teach health habits that may be continued after pregnancy.
        </Typography>
        <Typography variant="h5" align="" color="text.secondary" component="p">
         3. Educate in self-care for pregnancy.
        </Typography>
        <Typography variant="h5" align="" color="text.secondary" component="p">
         4. Provide physical care.
        </Typography>
        <Typography variant="h5" align="" color="text.secondary" component="p">
         5. Prepare parents for the responsibilities of parenthood
        </Typography>
      </Container>
    </ThemeProvider>
  );
}