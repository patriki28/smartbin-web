import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Card } from 'react-bootstrap';
import { sortDate } from '../../utils/sortDate';
import { prepareWasteChartData } from '../../utils/prepareWasteChartData';
import { chartPercentageOptions } from '../../utils/chartPercentageOption';
import Select from '../select/Select';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ title, data, filterBy, values }) {
    const [selectedValue, setSelectedValue] = useState('All');
    const sortedData = sortDate(data);

    const filteredData = selectedValue === 'All' ? sortedData : sortedData.filter((item) => item.type === selectedValue);

    const chartData = prepareWasteChartData(filteredData, values);

    return (
        <Card className="w-full rounded-5 p-2 my-2">
            <Card.Body>
                <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-between">
                    <h2 className="text-2xl font-bold">{title || 'Bar Chart'}</h2>

                    <div className="flex flex-wrap items-center gap-2">
                        <Select
                            label={`Select ${filterBy}`}
                            id="filter-value"
                            value={selectedValue}
                            options={[{ label: `All ${filterBy}`, value: 'All' }, ...values.map((value) => ({ label: value, value }))]}
                            onChange={setSelectedValue}
                        />
                    </div>
                </div>
                <hr className="my-2" />
                <Bar data={chartData} options={chartPercentageOptions} />
            </Card.Body>
        </Card>
    );
}
