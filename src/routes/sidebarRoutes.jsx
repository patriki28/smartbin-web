import { FaHome, FaChartBar, FaCog, FaUser } from 'react-icons/fa';

export const sidebarRoutes = [
    {
        path: '/home/dashboard',
        icon: <FaHome size={25} />,
        label: 'Dashboard',
    },
    {
        path: '/home/reports-analytics',
        icon: <FaChartBar size={25} />,
        label: 'Reports',
    },
    {
        path: '/home/user-management',
        icon: <FaUser size={25} />,
        label: 'Users',
    },
    {
        path: '/home/account-settings',
        icon: <FaCog size={25} />,
        label: 'Settings',
    },
];
