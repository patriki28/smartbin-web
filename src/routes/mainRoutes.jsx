import ProtectedRoutes from "../components/ProtectedRoutes";
import HomeLayout from "../layouts/homeLayout";
import LoginPage from "../pages/auth/loginPage/loginPage";
import AccountSettingsPage from "../pages/home/accountSettingsPage/accountSettingsPage";
import DashboardPage from "../pages/home/dashboardPage/dashboardPage";
import ReportAnalyticsPage from "../pages/home/reportAnalyticsPage/reportAnalyticsPage";
import PageNotFoundPage from "../pages/pageNotFoundPage/pageNotFoundPage";

export const mainRoutes = [
  {
    path: "*",
    element: <PageNotFoundPage/>,
  },
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
    element: <HomeLayout />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoutes>
            <DashboardPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "reportAnalytics",
        element: (
          <ProtectedRoutes>
            <ReportAnalyticsPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "accountSettings",
        element: (
          <ProtectedRoutes>
            <AccountSettingsPage />
          </ProtectedRoutes>
        ),
      },
    ],
  },
];
