import LineChart from '../../components/chart/LineChart';
import useFetchData from '../../hooks/useFetchData';
import Loader from '../../components/Loader';
import BarChart from '../../components/chart/BarChart';
import { binData } from '../../mocks/binData';
import { wasteTypeData } from '../../mocks/wasteTypeData';

export default function DashboardPage() {
    const { data: fillLevelsData, loading: fillLevelsLoading, error: fillLevelsError } = useFetchData('fill-levels');
    const { data: wasteData, loading: wasteLoading, error: wasteError } = useFetchData('wastes');

    if (fillLevelsLoading || wasteLoading) return <Loader />;

    if (fillLevelsError) return <div>{fillLevelsError}</div>;
    if (wasteError) return <div>{wasteError}</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-3">Admin Dashboard</h1>
            <div className="flex flex-col justify-center items-center gap-3 xl:flex-row">
                <LineChart title="Bin Fill-Level Charts" data={fillLevelsData} filterBy="bin" values={binData} valueKey="percentage" />
                <BarChart title="Waste Charts" data={wasteData} filterBy="type" values={wasteTypeData} />
            </div>
        </div>
    );
}
