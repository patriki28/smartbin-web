import { useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';
import useFetchData from '../../../hooks/useFetchData';
import PageNotFoundPage from '../../pageNotFoundPage/pageNotFoundPage';

export default function ViewUserMonitoredBinsPage() {
    const { id } = useParams();
    const { data, loading } = useFetchData('bins');

    if (loading) return <Loader />;
    if (!id) return <PageNotFoundPage />;

    const filteredData = data.filter((report) => report.userIds.includes(id));

    return (
        <div className="text-xl">
            <h1 className="w-full text-3xl font-bold mb-3">User Monitored bins</h1>

            {filteredData.length === 0 ? (
                <div>No monitored bins for this user.</div>
            ) : (
                <ul className="list-disc pl-5">
                    {filteredData.map((report) => (
                        <li key={report.id} className="text-gray-500 mb-2">
                            {report.id}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
