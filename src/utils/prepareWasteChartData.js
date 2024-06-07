export function prepareWasteChartData(filteredData, values, total) {
    const wasteTypeCounts = values.reduce((acc, type) => {
        acc[type] = filteredData.filter((item) => item.type === type).length;
        return acc;
    }, {});

    const chartData = {
        labels: ['Waste Types'],
        datasets: values.map((type, index) => ({
            label: type,
            data: [(wasteTypeCounts[type] / total) * 100],
            backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)'][index],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)'][index],
            borderWidth: 1,
        })),
    };

    return chartData;
}
