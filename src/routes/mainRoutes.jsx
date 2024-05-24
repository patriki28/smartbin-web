import ProtectedRoutes from '../components/ProtectedRoutes';
import LoginPage from '../pages/auth/loginPage/loginPage';
import DashboardPage from '../pages/home/dashboardPage/dashboardPage';
import ReportAnalyticsPage from '../pages/home/reportAnalyticsPage/reportAnalyticsPage';
import AccountSettingsPage from '../pages/home/accountSettingsPage/accountSettingsPage';
import PageNotFoundPage from '../pages/pageNotFoundPage/pageNotFoundPage';

import HomeLayout from '../layouts/homeLayout';
export const mainRoutes = [
    {
        path: '*',
        element: <PageNotFoundPage />,
    },
    {
        path: '/',
        element: (
            <ProtectedRoutes>
                <LoginPage />
            </ProtectedRoutes>
        ),
    },
    {
        path: '/home',
        element: (
            <ProtectedRoutes>
                <HomeLayout />
            </ProtectedRoutes>
        ),
        children: [
            {
                path: 'dashboard',
                element: (
                    <ProtectedRoutes>
                        <DashboardPage />
                    </ProtectedRoutes>
                ),
            },
            {
                path: 'reports-analytics',
                element: (
                    <ProtectedRoutes>
                        <ReportAnalyticsPage />
                    </ProtectedRoutes>
                ),
            },
            {
                path: 'account-settings',
                element: (
                    <ProtectedRoutes>
                        <AccountSettingsPage />
                    </ProtectedRoutes>
                ),
            },
        ],
    },
];
