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
import Loading from '../components/loading/Loading';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [amount, setAmount] = useState(null);
  const [lastMonth, setLastMonth] = useState(null);
  const [prevMonth, setPrevMonth] = useState(null);
  const [lastPrevMonth, setLastPrevMonth] = useState(null)
  const [diff, setDiff] = useState(null)
  const [userCount, setUserCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  } ,[])



  useEffect(() => {
    const fetchData = async () => {

      const userRef = query(collection(db, "users"))
      const userSnap = await getDocs(userRef)
     
      const today = new Date();
      const lastMonth = new Date(new Date().setMonth(today.getMonth() -1))
      const prevMonth = new Date(new Date().setMonth(today.getMonth() -2))
      const lastPrevMonth = new Date(new Date().setMonth(today.getMonth() -3))

      const q = query(collection(db, "pregnancy"), where("timeStamp", "<=", today))
      const lastMonthQuery = query(collection(db, "pregnancy"), where("timeStamp", "<=", today), where("timeStamp", ">", lastMonth))
      const prevMonthQuery = query(collection(db, "pregnancy"), where("timeStamp", "<=", lastMonth), where("timeStamp", ">", prevMonth))
      const lastPrevMonthQuery = query(collection(db, "pregnancy"), where("timeStamp", "<=", prevMonth), where("timeStamp", ">", lastPrevMonth))
      const lastMonthData = await getDocs(lastMonthQuery)
      const prevMonthData = await getDocs(prevMonthQuery)
      const lastPrevMonthData = await getDocs(lastPrevMonthQuery)
      const pregnancyAmount = await getDocs(q);

      setUserCount(userSnap.docs.length)
      setAmount (pregnancyAmount.docs.length)
      setLastMonth (lastMonthData.docs.length)
      setPrevMonth ( prevMonthData.docs.length)
      setLastPrevMonth (lastPrevMonthData.docs.length)
      setDiff ((lastMonthData.docs.length - prevMonthData.docs.length) / (prevMonthData.docs.length) * 100)
    }
    fetchData()
  }, [])

  return (
    <>
      <Helmet>
        <title> Dashboard | Pregnancy-monitoring-system </title>
      </Helmet>
    {loading ? (
      <Loading/>
    ) : (
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Pregnancy Monitoring System
        </Typography>

        <Grid container spacing={3}>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="USERS" total={userCount} color="error" icon={'mdi:users-outline'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="PREGNANTS" total={amount} color="error" icon={'healthicons:pregnant'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="ALL RECORDS" total={amount} color="error" icon={'ant-design:save-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <AppWebsiteVisits
              title="Pregnants"
              subheader= {`${diff}% more than last month`}
              chartLabels={[
                '2023-09-01',
                '2023-10-01',
                '2023-11-01',
              ]}
              chartData={[
                {
                  name: 'Pregnancy',
                  type: 'column',
                  fill: 'solid',
                  data: [`${lastPrevMonth}`,`${prevMonth}`,`${lastMonth}`],
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
    )}

    </>
  );
}
