import { binData } from '../../../mocks/binsData';
import LineChart from '../../../components/chart/LineChart';
import useFetchData from '../../../hooks/useFetchData';
import Loader from '../../../components/Loader';

export default function DashboardPage() {
    const { data, loading, error } = useFetchData('fill-levels');

    if (loading) return <Loader />;

    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <LineChart title="Bin Fill-Level Charts" data={data} filterBy="bin" values={binData} valueKey="percentage" />
        </div>
    );
}
