// component
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify/Iconify';

// ----------------------------------------------------------------------



const userConfig = [
  {
    title: 'dashboard',
    path: '/officer/app',
    icon: <Iconify icon={'material-symbols:home-outline'}/>,
  },
  {
    title: 'Pregnant Records',
    path: '/officer/pregnancy',
    icon: <Iconify icon={'vaadin:records'}/>,
  },
  {
    title: 'Doctor/Midwife',
    path: '/officer/staff',
    icon: <Iconify icon={'fluent:doctor-28-regular'}/>,
  },
  {
    title: 'Goals',
    path: '/officer/goals',
    icon: <Iconify icon={'octicon:goal-16'}/>,
  },

];

export default userConfig;
