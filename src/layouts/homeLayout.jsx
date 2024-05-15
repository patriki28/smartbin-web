import { Outlet } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { sidebarRoutes } from "../routes/sidebarRoutes";

export default function HomeLayout() {
  return (
    <div className="d-flex">
      <Sidebar>
        <Menu>
          {sidebarRoutes.map((route, index) => (
            <MenuItem key={index} to={route.path}>
              {route.label}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>
      <main className="d-flex w-100 min-vh-100 bg-primary">
        <Outlet />
      </main>
    </div>
  );
}
