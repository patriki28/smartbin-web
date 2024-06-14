import Loader from '../../../components/Loader';
import BarChart from '../../../components/chart/BarChart';
import LineChart from '../../../components/chart/LineChart';
import useFetchData from '../../../hooks/useFetchData';
import { wasteTypeData } from '../../../mocks/wasteTypeData';

export default function DashboardPage() {
    const { data: binsData, loading: binsLoading, error: binsError } = useFetchData('bins');
    const { data: fillLevelsData, loading: fillLevelsLoading, error: fillLevelsError } = useFetchData('fill_level_data');
    const { data: wastesData, loading: wastesLoading, error: wastesError } = useFetchData('waste_data');

    if (fillLevelsLoading || binsLoading || wastesLoading) return <Loader />;

    const errors = [binsError, fillLevelsError, wastesError].filter(Boolean);
    if (errors.length > 0) return <div>{errors.join(', ')}</div>;

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
