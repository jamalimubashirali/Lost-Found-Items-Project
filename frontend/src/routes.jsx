import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "./App";
import AuthLayout from "./components/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingSpinner from "./components/ui/LoadingSpinner";

// Lazy-loaded components
const LandingPage = lazy(() => import("./pages/LandingPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const RegisterItemPage = lazy(() => import("./pages/RegisterItemPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const ItemDetailsPage = lazy(() => import("./pages/ItemDetailsPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const AdminPanelPage = lazy(() => import("./pages/AdminPanelPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));

const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <LandingPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "login",
        element: (
          <SuspenseWrapper>
            <LoginPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "register",
        element: (
          <SuspenseWrapper>
            <SignupPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "home",
        element: (
          <AuthLayout authentication>
            <SuspenseWrapper>
              <HomePage />
            </SuspenseWrapper>
          </AuthLayout>
        ),
      },
      {
        path: "profile/:id",
        element: (
          <AuthLayout authentication>
            <SuspenseWrapper>
              <ProfilePage />
            </SuspenseWrapper>
          </AuthLayout>
        ),
      },
      {
        path: "items",
        children: [
          {
            index: true,
            element: (
              <AuthLayout authentication>
                <SuspenseWrapper>
                  <GalleryPage />
                </SuspenseWrapper>
              </AuthLayout>
            ),
          },
          {
            path: ":itemId",
            element: (
              <AuthLayout authentication>
                <SuspenseWrapper>
                  <ItemDetailsPage />
                </SuspenseWrapper>
              </AuthLayout>
            ),
          },
          {
            path: "register-item",
            element: (
              <AuthLayout authentication>
                <SuspenseWrapper>
                  <RegisterItemPage />
                </SuspenseWrapper>
              </AuthLayout>
            ),
          },
          {
            path: "item-chat",
            element: (
              <AuthLayout authentication>
                <SuspenseWrapper>
                  <ChatPage />
                </SuspenseWrapper>
              </AuthLayout>
            ),
          },
        ],
      },
      {
        path: "dashboard",
        element: (
          <AuthLayout authentication>
            {/* <ProtectedRoute adminOnly>
            
          </ProtectedRoute> */}
            <SuspenseWrapper>
              <DashboardPage />
            </SuspenseWrapper>
          </AuthLayout>
        ),
      },
      {
        path: "admin-panel",
        element: (
          <AuthLayout authentication>
            <ProtectedRoute adminOnly>
              <SuspenseWrapper>
                <AdminPanelPage />
              </SuspenseWrapper>
            </ProtectedRoute>
          </AuthLayout>
        ),
      },
    ],
  },
]);

export default router;
