import ProtectedRoutes from "../components/ProtectedRoutes";
import HomeLayout from "../layouts/homeLayout";
import LoginPage from "../pages/auth/loginPage/loginPage";
import AccountSettingsPage from "../pages/home/accountSettingsPage/accountSettingsPage";
import DashboardPage from "../pages/home/dashboardPage/dashboardPage";
import ReportAnalyticsPage from "../pages/home/reportAnalyticsPage/reportAnalyticsPage";

export const mainRoutes = [
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <LoginPage />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoutes>
        <HomeLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "reportAnalytics",
        element: <ReportAnalyticsPage />,
      },
      {
        path: "accountSettings",
        element: <AccountSettingsPage />,
      },
    ],
  },
];
