import { Card } from 'react-bootstrap';
import formatDate from '../../utils/formatDate';
import { sortDate } from '../../utils/sortDate';

export default function NewUsersCard({ usersData }) {
    const latestUsersData = [...usersData]
        .filter((user) => user.role === 'user')
        .reverse()
        .slice(0, 5);

    return (
        <div>
            <Card className="w-fit rounded-5 p-2 my-2">
                <Card.Body>
                    <h1 className="text-2xl font-bold">New Waste Personnel</h1>
                    <ul className="my-4 space-y-3">
                        <li className="w-full flex flex-row justify-between">
                            <div className="flex flex-row">
                                <span className="flex-1 text-left ms-3 whitespace-nowrap font-bold">Avatar</span>
                                <span className="flex-1 text-left ms-3 whitespace-nowrap font-bold">Name</span>
                            </div>
                            <span className="text-left ms-3 whitespace-nowrap font-bold">Created at</span>
                        </li>
                        {latestUsersData.length === 0 ? (
                            <li>
                                <p className="text-center text-gray-500">No new waste personnel available</p>
                            </li>
                        ) : (
                            sortDate(latestUsersData)
                                .reverse()
                                .map((user) => (
                                    <li key={user.id}>
                                        <a
                                            href="#"
                                            className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow"
                                        >
                                            <img
                                                src={
                                                    user.profilePicture
                                                        ? user.profilePicture
                                                        : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
                                                }
                                                alt={`${user.firstName} ${user.lastName}`}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <span className="flex-1 text-left ms-3 whitespace-nowrap font-semibold">
                                                {user.lastName}, {user.firstName} {user.middleName}
                                            </span>
                                            <span className="flex-1 text-left ms-3 whitespace-nowrap font-semibold">
                                                {formatDate(user.created_at)}
                                            </span>
                                        </a>
                                    </li>
                                ))
                        )}
                    </ul>
                </Card.Body>
            </Card>
        </div>
    );
}
