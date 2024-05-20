import { FaHome, FaChartBar, FaCog } from 'react-icons/fa';

export const sidebarRoutes = [
    {
        path: '/home/dashboard',
        icon: <FaHome size={25} />,
        label: 'Dashboard',
    },
    {
        path: '/home/reportAnalytics',
        icon: <FaChartBar size={25} />,
        label: 'Report and Analytics',
    },
    {
        path: '/home/accountSettings',
        icon: <FaCog size={25} />,
        label: 'Settings',
    },
];
