// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Add Pregnant',
    path: '/dashboard/add',
    icon: icon('ic_user'),
  },
  {
    title: 'Pregnant Records',
    path: '/dashboard/user',
    icon: icon('ic_cart'),
  },
  {
    title: 'Goals',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },

];

export default navConfig;
