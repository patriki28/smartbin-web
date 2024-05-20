import ProtectedRoutes from '../components/ProtectedRoutes';
import LoginPage from '../pages/auth/loginPage/loginPage';
import AccountSettingsPage from '../pages/home/accountSettingsPage/accountSettingsPage';
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
        path: 'accountSettings',
        element: (
            <ProtectedRoutes>
                <AccountSettingsPage />
            </ProtectedRoutes>
        ),
    },
];
