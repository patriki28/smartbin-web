import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Card } from 'react-bootstrap';
import { sortData } from '../../utils/sortData';
import { prepareChartData } from '../../utils/prepareChartData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ title, data, filterBy, values, valueKey, labelBy }) {
    const [selectedValue, setSelectedValue] = useState('All');

    const filteredData = selectedValue === 'All' ? sortData(data) : sortData(data).filter((item) => item[filterBy] === selectedValue);
    const chartData = prepareChartData(filteredData, filterBy, values, valueKey, labelBy);

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
        },
    };

    return (
        <Card className="w-full rounded-5 p-2 my-2">
            <Card.Body>
                <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-between">
                    <h2 className="text-2xl font-bold">{title || 'Bar Chart'}</h2>
                    <div>
                        <label htmlFor="filter-value" className="font-semibold text-lg">
                            Select {filterBy}:
                        </label>
                        <select
                            id="filter-value"
                            value={selectedValue}
                            className="border rounded-lg p-2 ml-2"
                            onChange={(e) => setSelectedValue(e.target.value)}
                        >
                            <option value="All">All {filterBy}</option>
                            {values.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <hr className="my-2" />
                <Bar data={chartData} options={chartOptions} />
            </Card.Body>
        </Card>
    );
}
