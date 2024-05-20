import { FaHome, FaCog, } from "react-icons/fa";

export const sidebarRoutes = [
  {
    path: "/home/dashboard",
    icon: <FaHome size={25}/>,
    label: "Dashboard",
  },
  {
    path: "/home/accountSettings",
    icon: <FaCog size={25}/>,
    label: "Settings",
  },
];
