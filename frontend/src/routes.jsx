import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import RegisterItemPage from './pages/RegisterItemPage';
import GalleryPage from './pages/GalleryPage';
import ReportFormPage from './pages/ReportFormPage';
import ItemDetailsPage from './pages/ItemDetailsPage';
import DashboardPage from './pages/DashboardPage';
import AdminPanelPage from './pages/AdminPanelPage';
import AuthLayout from './components/AuthLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path : "login",
        element : <LoginPage />
      },
      {
        path : "register",
        element : <SignupPage />
      },
      {
        path : 'home',
        element : <AuthLayout authentication={false}>
          <HomePage />
        </AuthLayout>
      },
      {
        path:'profile/:id',
        element : <AuthLayout authentication={false}>
          <ProfilePage />
        </AuthLayout>
      },
      {
        path: 'items',
        children: [
          {
            index: true,
            element: <AuthLayout authentication={false}>
              <GalleryPage />
            </AuthLayout>,
          },
          {
            path: ':itemId',
            element: <AuthLayout authentication={false}>
              <ItemDetailsPage />
            </AuthLayout>
          },
          {
            path: 'register-item',
            element: <AuthLayout authentication={false}>
              <RegisterItemPage />
              </AuthLayout>
          }
        ]
      },
      {
        path: 'report',
        element: <ReportFormPage />
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute adminOnly>
            <AdminPanelPage />
          </ProtectedRoute>
        )
      }
    ]
  }
]);

export default router;