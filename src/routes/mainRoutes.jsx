import ProtectedRoutes from '../components/ProtectedRoutes';
import HomeLayout from '../layouts/homeLayout';
import LoginPage from '../pages/auth/loginPage/loginPage';
import AccountSettingsPage from '../pages/home/accountSettingsPage/accountSettingsPage';
import DashboardPage from '../pages/home/dashboardPage/dashboardPage';
import RegisteredBinsPage from '../pages/home/registeredBinsPage/registeredBinsPage';
import ReportAnalyticsPage from '../pages/home/reportAnalyticsPage/reportAnalyticsPage';
import UserManagementPage from '../pages/home/userManagementPage/userManagementPage';
import ViewAnalyzeReportsPage from '../pages/home/viewAnalyzedReportsPage/viewAnalyzeReportsPage';
import ViewUserMonitoredBinsPage from '../pages/home/viewUserMonitoredBinsPage/viewUserMonitoredBinsPage';
import PageNotFoundPage from '../pages/pageNotFoundPage/pageNotFoundPage';
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
                path: 'registered-bins',
                element: (
                    <ProtectedRoutes>
                        <RegisteredBinsPage />
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
                path: 'reports-analytics/:id',
                element: (
                    <ProtectedRoutes>
                        <ViewAnalyzeReportsPage />
                    </ProtectedRoutes>
                ),
            },
            {
                path: 'user-monitored-bins/:id',
                element: (
                    <ProtectedRoutes>
                        <ViewUserMonitoredBinsPage />
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
