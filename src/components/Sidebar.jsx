import { sidebarRoutes } from '../routes/sidebarRoutes';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ navOpen }) {
    const location = useLocation();

    return (
        <aside
            id="logo-sidebar"
            className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 
      -translate-${navOpen ? 'w' : 'x'}-full sm:translate-x-0`}
            aria-label="Sidebar"
        >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
                <ul className="space-y-2 font-medium">
                    {sidebarRoutes.map((route, index) => (
                        <Link
                            key={index}
                            to={route.path}
                            className={`flex items-center p-2 rounded-lg hover:text-white hover:bg-black 
              ${location.pathname === route.path ? 'bg-black text-white' : ''}`}
                        >
                            <div className="transition duration-75">{route.icon}</div>
                            <span className="ms-3 ">{route.label}</span>
                        </Link>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
