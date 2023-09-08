// component
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify/Iconify';

// ----------------------------------------------------------------------



const navConfig1 = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <Iconify icon={'material-symbols:home-outline'}/>,
  },
  {
    title: 'Pregnant Records',
    path: '/dashboard/user',
    icon: <Iconify icon={'vaadin:records'}/>,
  },
  {
    title: 'Goals',
    path: '/dashboard/goals',
    icon: <Iconify icon={'octicon:goal-16'}/>,
  },

];

export default navConfig1;
