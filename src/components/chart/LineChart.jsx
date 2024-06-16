import { CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { timePeriodData } from '../../mocks/timePeriodData';
import { prepareFillChartData } from '../../utils/prepareFillChartData';
import { sortDate } from '../../utils/sortDate';
import Select from '../select/Select';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LineChart({ title, data, filterBy, values, valueKey }) {
    const [selectedValue, setSelectedValue] = useState('All');
    const [timePeriod, setTimePeriod] = useState('daily');

    const sortedData = sortDate(data);
    const chartData = prepareFillChartData(sortedData, filterBy, values, valueKey, timePeriod, selectedValue);

    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: function (value) {
                        return value + '%';
                    },
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.dataset.label + ': ' + tooltipItem.raw.toFixed(2) + '%';
                    },
                },
            },
        },
    };

    return (
        <Card className="w-full rounded-5 p-2 my-2">
            <Card.Body>
                <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-between">
                    <h2 className="text-2xl font-bold">{title || `Line Charts`}</h2>

                    <div className="flex flex-wrap items-center gap-2">
                        <Select
                            label={`Select ${filterBy}`}
                            id="filter-value"
                            value={selectedValue}
                            options={[{ label: `All ${filterBy}`, value: 'All' }, ...values.map((value) => ({ label: value, value }))]}
                            onChange={setSelectedValue}
                        />
                        <Select label="Select Time Period" id="filter-period" value={timePeriod} options={timePeriodData} onChange={setTimePeriod} />
                    </div>
                </div>
                <hr className="my-2" />
                <Line data={chartData} options={chartOptions} />
            </Card.Body>
        </Card>
    );
}
