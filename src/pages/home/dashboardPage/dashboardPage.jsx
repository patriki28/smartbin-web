import LineChart from '../../../components/chart/LineChart';
import { fillData } from '../../../mocks/fillData';
import { binData } from '../../../mocks/binsData';

export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <LineChart title="Bin Fill-Level Charts" data={fillData} filterBy="bin" values={binData} valueKey="percentage" />
        </div>
    );
}
