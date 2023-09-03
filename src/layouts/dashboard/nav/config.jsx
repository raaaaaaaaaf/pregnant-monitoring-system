// component
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify/Iconify';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <Iconify icon={'material-symbols:home-outline'}/>,
  },
  {
    title: 'Add Pregnant',
    path: '/dashboard/add',
    icon: <Iconify icon={'healthicons:pregnant'}/>,
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

export default navConfig;
