import Loader from '../../../components/Loader';
import NewUsersCard from '../../../components/card/newUsersCard';
import RegisteredBins from '../../../components/card/registeredBins';
import BarChart from '../../../components/chart/BarChart';
import LineChart from '../../../components/chart/LineChart';
import useFetchData from '../../../hooks/useFetchData';
import { wasteTypeData } from '../../../mocks/wasteTypeData';

export default function DashboardPage() {
    const { data: usersData, loading: usersLoading, error: usersError } = useFetchData('users');
    const { data: binsData, loading: binsLoading, error: binsError } = useFetchData('bins');
    const { data: fillLevelsData, loading: fillLevelsLoading, error: fillLevelsError } = useFetchData('fill-levels');

    if (fillLevelsLoading || binsLoading || usersLoading) return <Loader />;

    if (usersError) return <div>{usersError}</div>;
    if (binsError) return <div>{binsError}</div>;
    if (fillLevelsError) return <div>{fillLevelsError}</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-3">Admin Dashboard</h1>
            <div className="flex flex-wrap items-center gap-3">
                <RegisteredBins binsData={binsData} />
                <NewUsersCard usersData={usersData} />
            </div>

            <div className="flex flex-col justify-center items-center gap-3 xl:flex-row">
                <LineChart
                    title="Fill-Level Charts"
                    data={fillLevelsData}
                    filterBy="bin"
                    values={binsData.map((bin) => bin.id)}
                    valueKey="percentage"
                />
                <BarChart
                    title="Waste Charts"
                    data={fillLevelsData}
                    filterBy="bin_type"
                    values={wasteTypeData}
                    filterBin={binsData.map((bin) => bin.id)}
                />
            </div>
        </div>
    );
}
