// component
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify/Iconify';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const adminConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <Iconify icon={'material-symbols:home-outline'}/>,
  },
  {
    title: 'Users',
    path: '/dashboard/user',
    icon: <Iconify icon={'mdi:users-outline'}/>,
  },
  {
    title: 'Pregnant Records',
    path: '/dashboard/pregnancy',
    icon: <Iconify icon={'vaadin:records'}/>,
  },
  {
    title: 'Doctor/Midwife',
    path: '/dashboard/staff',
    icon: <Iconify icon={'fluent:doctor-28-regular'}/>,
  },
  {
    title: 'Goals',
    path: '/dashboard/goals',
    icon: <Iconify icon={'octicon:goal-16'}/>,
  },

];

export default adminConfig;
