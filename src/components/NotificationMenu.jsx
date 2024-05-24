import { FaBell } from 'react-icons/fa';
import { notificationData } from '../mocks/notificationData';

export default function NotificationMenu({ notificationOpen, handleNotification }) {
    return (
        <div className="flex items-center ms-3">
            <button
                type="button"
                onClick={handleNotification}
                className="inline-flex items-center p-2 text-gray-500 rounded-full bg-gray-100 outline-none focus:ring-2 ring-gray-200"
            >
                <FaBell size={25} />
            </button>

            <div
                className={`text-base list-none bg-white divide-y divide-black hover:text-white rounded shadow
        ${notificationOpen ? 'fixed top-20 right-20' : 'hidden'}`}
                id="dropdown-user"
            >
                <ul className="py-1" role="none">
                    {notificationData
                        .slice(0, 4)
                        .reverse()
                        .map((notification, index) => (
                            <li key={index}>
                                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-black hover:text-white" role="menuitem">
                                    <h1 className="text-lg font-semibold">{notification.title}</h1>
                                    {notification.date}
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}
