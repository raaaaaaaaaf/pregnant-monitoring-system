import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null)



  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const lastMonth = new Date(new Date().setMonth(today.getMonth() -1))
      const prevMonth = new Date(new Date().setMonth(today.getMonth() -2))

      const q = query(collection(db, "pregnancy"), where("timeStamp", "<=", today))
      const lastMonthQuery = query(collection(db, "pregnancy"), where("timeStamp", "<=", today), where("timeStamp", ">", lastMonth))
      const prevMonthQuery = query(collection(db, "pregnancy"), where("timeStamp", "<=", lastMonth), where("timeStamp", ">", prevMonth))
      const lastMonthData = await getDocs(lastMonthQuery)
      const prevMonthData = await getDocs(prevMonthQuery)
      const pregnancyAmount = await getDocs(q);

      setAmount (pregnancyAmount.docs.length)
      setDiff ((lastMonthData.docs.length - prevMonthData.docs.length) / (prevMonthData.docs.length) * 100)
    }
    fetchData()
  }, [])

  return (
    <>
      <Helmet>
        <title> Dashboard | Pregnancy-monitoring-system </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Pregnancy Monitoring System
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="PREGNANTS" total={amount} color="error" icon={'healthicons:pregnant'} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="ALL RECORDS" total={amount} color="error" icon={'ant-design:save-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <AppWebsiteVisits
              title="Pregnants"
              subheader= {`${diff}% more than last month`}
              chartLabels={[
                '07/01/2023',
                '08/01/2023',
              ]}
              chartData={[
                {
                  name: 'Pregnancy',
                  type: 'column',
                  fill: 'solid',
                  data: [2,3],
                },

              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits per Purok"
              chartData={[
                { label: 'Purok - 1', value: 44 },
                { label: 'Purok - 2', value: 35 },
                { label: 'Purok - 3', value: 43 },
                { label: 'Purok - 4', value: 43 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid> */}

        </Grid>
      </Container>
    </>
  );
}
