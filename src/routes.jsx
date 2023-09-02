import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import { auth } from './firebase/firebaseConfig';
import AddPregnancy from './pages/AddPregnancy';
import EditPregnancy from './pages/EditPregnancy';
import ViewPage from './pages/ViewPage';
// ----------------------------------------------------------------------



export default function Router() {
  const {currentUser} = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" replace/>
    }
    return children
  }


  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="/login" />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: 'dashboard',
      element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
      children: [
        { element: <ProtectedRoute><Navigate to="/dashboard/app" /></ProtectedRoute>, index: true },
        { path: 'app', element: <ProtectedRoute><DashboardAppPage /></ProtectedRoute> },
        { path: 'user', element:  <ProtectedRoute><UserPage /></ProtectedRoute>},
        { path: 'products', element: <ProtectedRoute><ProductsPage /></ProtectedRoute> },
        { path: 'blog', element: <ProtectedRoute><BlogPage /></ProtectedRoute> },
        { path: 'add', element: <ProtectedRoute><AddPregnancy /></ProtectedRoute>,},
        { path: 'user/edit/:id', element: <ProtectedRoute><EditPregnancy /></ProtectedRoute>,},
        { path: 'user/view/:id', element: <ProtectedRoute><ViewPage /></ProtectedRoute>,},
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
