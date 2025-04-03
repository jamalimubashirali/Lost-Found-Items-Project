import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import ReportFormPage from './pages/ReportFormPage';
import ItemDetailsPage from './pages/ItemDetailsPage';
import DashboardPage from './pages/DashboardPage';
import AdminPanelPage from './pages/AdminPanelPage';
import AuthLayout from './components/AuthLayout';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'items',
        children: [
          {
            index: true,
            element: <GalleryPage />,
          },
          {
            path: ':itemId',
            element: <ItemDetailsPage />
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