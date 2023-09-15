
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { AppNewsUpdate, AppOrderTimeline } from '../sections/@dashboard/app';
import { Card, CardHeader, Grid } from '@mui/material';
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import Loading from '../components/loading/Loading';


export default function GoalsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  } ,[])
  return (
<>
{loading ? (
  <Loading/>
) : (
  <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Major Goals of Prenatal Care"
              list={[
                {
                  id: faker.datatype.uuid(),
                  title: 'Ensure a safe birth for mother and child by promoting good health habits and reducing risk factors.',
                  description: faker.name.jobTitle(),
                  image: `/assets/images/covers/cover_1.jpg`,
                  postedAt: faker.date.recent(),
                },
                {
                  id: faker.datatype.uuid(),
                  title: 'Teach health habits that may be continued after pregnancy.',
                  description: faker.name.jobTitle(),
                  image: `/assets/images/covers/cover_2.png`,
                  postedAt: faker.date.recent(),
                },
                {
                  id: faker.datatype.uuid(),
                  title: 'Educate in self-care for pregnancy.',
                  description: faker.name.jobTitle(),
                  image: `/assets/images/covers/cover_3.jpg`,
                  postedAt: faker.date.recent(),
                },
                {
                  id: faker.datatype.uuid(),
                  title: 'Provide physical care.',
                  description: faker.name.jobTitle(),
                  image: `/assets/images/covers/cover_4.jpg`,
                  postedAt: faker.date.recent(),
                },
                {
                  id: faker.datatype.uuid(),
                  title: 'Prepare parents for the responsibilites of parenthood.',
                  description: faker.name.jobTitle(),
                  image: `/assets/images/covers/cover_5.png`,
                  postedAt: faker.date.recent(),
                },
              ]}
            />
  </Grid>
)}

</>
  );
}
