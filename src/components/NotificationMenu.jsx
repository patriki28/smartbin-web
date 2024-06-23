import { Spinner } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import useFetchData from '../hooks/useFetchData';
import formatDate from '../utils/formatDate';
import { sortDate } from '../utils/sortDate';

export default function NotificationMenu({ notificationOpen, handleNotification }) {
    const { data, loading, error } = useFetchData('notifications');

    if (error) return <div>{error}</div>;

    const unreadNotif = data.filter((notification) => notification.isRead === false).length;

    return (
        <div className="flex items-center ms-3">
            <button
                type="button"
                onClick={handleNotification}
                className="inline-flex items-center p-2 text-gray-500 rounded-full bg-gray-100 outline-none focus:ring-2 ring-gray-200"
            >
                <FaBell size={25} />
                {unreadNotif > 0 && <div className="bg-red-500 text-white px-1 rounded-full">{unreadNotif}</div>}
            </button>

            <div
                className={`text-base list-none bg-white divide-y divide-black rounded shadow ${
                    notificationOpen ? 'fixed top-20 right-20' : 'hidden'
                }`}
                id="dropdown-user"
            >
                {loading ? (
                    <Spinner size="lg" />
                ) : (
                    <ul className="py-1" role="none">
                        {sortDate(data)
                            .reverse()
                            .slice(0, 5)
                            .map((notification, index) => (
                                <li key={index}>
                                    <div
                                        className={`block px-4 ${notification.isRead && `bg-gray-200`} py-2 text-sm text-gray-700 hover:bg-black hover:text-white`}
                                        role="menuitem"
                                    >
                                        <h1 className="text-lg font-semibold">{notification.title}</h1>
                                        <p>{formatDate(notification.timestamp)}</p>
                                    </div>
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
