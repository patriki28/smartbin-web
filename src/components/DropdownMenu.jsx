import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import { dropdownRoutes } from "../routes/dropdownRoutes";

export default function DropdownMenu({ dropdownOpen, handleDropdown }) {
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      signOut(auth);
    }
  };

  return (
    <div className="flex items-center ms-3">
      <img
        onClick={handleDropdown}
        className="w-10 h-10 rounded-full border border-black"
        src="https://i.pinimg.com/222x/57/70/f0/5770f01a32c3c53e90ecda61483ccb08.jpg"
        alt="user photo"
      />
      <div
        className={`text-base list-none bg-white divide-y divide-black hover:text-white rounded shadow
        ${dropdownOpen ? "fixed top-20 right-2" : "hidden"}`}
        id="dropdown-user"
      >
        <div className="px-4 py-3" role="none">
          <p className="text-sm font-medium text-gray-900 truncate" role="none">
            {auth.currentUser.email ? auth.currentUser.email : "Admin"}
          </p>
        </div>
        <ul className="py-1" role="none">
          {dropdownRoutes.map((route, index) => (
            <li key={index}>
              <Link
                to={route.path}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-black hover:text-white"
                role="menuitem"
              >
                {route.label}
              </Link>
            </li>
          ))}

          <li>
            <div
              onClick={handleLogout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-black hover:text-white"
              role="menuitem"
            >
              Sign out
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
