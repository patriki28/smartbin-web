import Loader from '../../../components/Loader';
import BarChart from '../../../components/chart/BarChart';
import LineChart from '../../../components/chart/LineChart';
import useFetchData from '../../../hooks/useFetchData';
import { wasteTypeData } from '../../../mocks/wasteTypeData';

export default function DashboardPage() {
    const { data: binsData, loading: binsLoading } = useFetchData('bins');
    const { data: fillLevelsData, loading: fillLevelsLoading } = useFetchData('fill_level_data');
    const { data: wastesData, loading: wastesLoading } = useFetchData('waste_data');

    if (fillLevelsLoading || binsLoading || wastesLoading) return <Loader />;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-3">Admin Dashboard</h1>
            <div className="flex flex-col justify-center items-center gap-3 xl:flex-row">
                <LineChart
                    title="Fill-Level Charts"
                    data={fillLevelsData}
                    filterBy="bin"
                    values={binsData.map((bin) => bin.id)}
                    valueKey="percentage"
                />
                <BarChart title="Waste Charts" data={wastesData} filterBy="type" values={wasteTypeData} filterBin={binsData.map((bin) => bin.id)} />
            </div>
        </div>
    );
}
