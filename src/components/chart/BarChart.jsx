import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { chartPercentageOptions } from '../../utils/chartPercentageOption';
import { prepareWasteChartData } from '../../utils/prepareWasteChartData';
import { sortDate } from '../../utils/sortDate';
import Select from '../select/Select';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ title, data, filterBy, values, filterBin }) {
    const [selectedBin, setSelectedBin] = useState('All');
    const [selectedValue, setSelectedValue] = useState('All');
    const sortedData = sortDate(data);

    useEffect(() => {
        if (filterBin && filterBin.length > 0) {
            setSelectedBin(filterBin[0]);
        }
    }, [filterBin]);

    const filteredData = sortedData
        .filter((item) => item.bin_id === selectedBin)
        .filter((item) => selectedValue === 'All' || item.type === selectedValue);

    const chartData = prepareWasteChartData(filteredData, values, sortedData.length);

    return (
        <Card className="w-full rounded-5 p-2 my-2">
            <Card.Body>
                <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-between">
                    <h2 className="text-2xl font-bold">{title || 'Bar Chart'}</h2>

                    <div className="flex flex-wrap items-center gap-2">
                        <Select
                            label={`Select bin`}
                            id="filter-value"
                            value={selectedBin}
                            options={filterBin.map((value) => ({ label: value, value }))}
                            onChange={setSelectedBin}
                        />
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
