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
    title: 'Add Pregnant',
    path: '/officer/add',
    icon: <Iconify icon={'healthicons:pregnant'}/>,
  },
  {
    title: 'Pregnant Records',
    path: '/officer/patients',
    icon: <Iconify icon={'vaadin:records'}/>,
  },
  {
    title: 'Goals',
    path: '/officer/goals',
    icon: <Iconify icon={'octicon:goal-16'}/>,
  },

];

export default userConfig;
