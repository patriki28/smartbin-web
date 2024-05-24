import { FaHome, FaChartBar, FaCog } from 'react-icons/fa';

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
        path: '/home/account-settings',
        icon: <FaCog size={25} />,
        label: 'Settings',
    },
];
