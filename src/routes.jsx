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
import GoalsPage from './pages/GoalsPage';
import Loading from './components/loading/Loading';
import PatientRecordPage from './pages/PatientRecordPage';
import UserDashboardAppPage from './pages/userPages/UserDashboardAppPage';
// ----------------------------------------------------------------------



export default function Router() {

  const ProtectedRoute = ({ children, role }) => {
    const { currentUser, loading, userData } = useContext(AuthContext);

    if (loading) {
      return <Loading/>
    }
  
    if (!currentUser) {
      // Redirect to the login page if the user is not authenticated
      return <Navigate to="/login" />;
    }
    if (role && userData.role !== role) {
      if (userData.role === "Admin") {
        return <Navigate to={'/dashboard'}/>
      } else {
        return <Navigate to={'/officer'}/>
      }
    }
     // Render the children if the user is authenticated
    return children;
  };


  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="/login" replace />, // Redirect to the login page
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
        // Remove the index: true from this route
        { element: <ProtectedRoute role={"Admin"}><Navigate to="/dashboard/app" /></ProtectedRoute>, index: true },
        { path: 'app', element: <ProtectedRoute role={"Admin"}><DashboardAppPage /></ProtectedRoute> },
        { path: 'user', element:  <ProtectedRoute role={"Admin"}><UserPage /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute role={"Admin"}><ProductsPage /></ProtectedRoute> },
        { path: 'blogs', element: <ProtectedRoute role={"Admin"}><BlogPage /></ProtectedRoute> },
        { path: 'goals', element: <ProtectedRoute role={"Admin"}><GoalsPage /></ProtectedRoute> },
        { path: 'add', element: <ProtectedRoute role={"Admin"}><AddPregnancy /></ProtectedRoute>,},
        { path: 'patients', element:  <ProtectedRoute role={"Admin"}><PatientRecordPage /></ProtectedRoute> },
        { path: 'patients/edit/:id', element: <ProtectedRoute role={"Admin"}><EditPregnancy /></ProtectedRoute>,},
        { path: 'patients/view/:id', element: <ProtectedRoute role={"Admin"}><ViewPage /></ProtectedRoute>,},
      ],
    },
    {
      path: 'officer',
      element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
      children: [
        // Remove the index: true from this route
        { element: <ProtectedRoute role={"Officer"}><Navigate to="/officer/app" /></ProtectedRoute>, index: true },
        { path: 'app', element: <ProtectedRoute role={"Officer"}><UserDashboardAppPage /></ProtectedRoute> },
        { path: 'user', element:  <ProtectedRoute role={"Officer"}><UserPage /></ProtectedRoute> },
        { path: 'add', element: <ProtectedRoute role={"Officer"}><AddPregnancy /></ProtectedRoute>,},
        { path: 'goals', element: <ProtectedRoute role={"Officer"}><GoalsPage /></ProtectedRoute> },
        { path: 'patients', element:  <ProtectedRoute role={"Officer"}><PatientRecordPage /></ProtectedRoute> },
        { path: 'patients/edit/:id', element: <ProtectedRoute role={"Officer"}><EditPregnancy /></ProtectedRoute>,},
        { path: 'patients/view/:id', element: <ProtectedRoute role={"Officer"}><ViewPage /></ProtectedRoute>,},
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <ProtectedRoute><Navigate to="/dashboard/app" /></ProtectedRoute>, index: true },
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
