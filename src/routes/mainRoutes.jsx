import ProtectedRoutes from '../components/ProtectedRoutes';
import LoginPage from '../pages/auth/LoginPage';
import DashboardPage from '../pages/home/DashboardPage';
import ReportAnalyticsPage from '../pages/home/ReportAnalyticsPage';
import UserManagementPage from '../pages/home/UserManagementPage';
import AccountSettingsPage from '../pages/home/AccountSettingsPage';
import PageNotFoundPage from '../pages/shared/PageNotFoundPage';
import HomeLayout from '../layouts/HomeLayout';

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
                path: 'user-management',
                element: (
                    <ProtectedRoutes>
                        <UserManagementPage />
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
