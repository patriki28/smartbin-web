import { Outlet } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { sidebarRoutes } from "../routes/sidebarRoutes";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function HomeLayout() {

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      signOut(auth);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar>
        <Menu>
          {sidebarRoutes.map((route, index) => (
            <MenuItem key={index} to={route.path}>
              {route.label}
            </MenuItem>
          ))}
          <MenuItem onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
      <main className="d-flex w-100 min-vh-100 bg-primary">
        <Outlet />
      </main>
    </div>
  );
}
