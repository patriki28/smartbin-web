import LineChart from '../../../components/chart/LineChart';
import BarChart from '../../../components/chart/BarChart';
import { fillData } from '../../../mocks/fillData';
import { wasteData } from '../../../mocks/wasteData';
import { binTypeData } from '../../../mocks/binTypeData';
import { wasteTypeData } from '../../../mocks/wasteTypeData';

export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="flex flex-col gap-3 xl:flex-row">
                <LineChart
                    title="Bin Fill-Level Charts"
                    data={fillData}
                    filterBy="id"
                    values={binTypeData}
                    valueKey="percentage"
                    labelBy="time_stamp"
                />
                <BarChart title="Waste Charts" data={wasteData} filterBy="type" values={wasteTypeData} />
            </div>
        </div>
    );
}
