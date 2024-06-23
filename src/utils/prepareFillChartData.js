import formatTimePeriodLabel from './formatTimePeriodLabel';

export const prepareFillChartData = (data, filterBy, values, valueKey, timePeriod, selectedValue) => {
    const labels = [
        ...new Set(
            data.map((item) => {
                if (!item.timestamp) {
                    console.error('Missing timestamp for item:', item);
                    return '';
                }
                try {
                    return formatTimePeriodLabel(item.timestamp.toDate(), timePeriod);
                } catch (error) {
                    console.error('Error formatting timestamp for item:', item, error);
                    return '';
                }
            })
        ),
    ].filter((label) => label !== '');

    const uniqueLabels = filterUniqueDays(labels);

    const datasets = values.map((value, index) => {
        const valueData = data.filter((item) => item[filterBy] === value);

        const groupedData = valueData.reduce((acc, item) => {
            if (!item.timestamp) {
                console.error('Missing timestamp for item:', item);
                return acc;
            }
            try {
                const dateLabel = formatTimePeriodLabel(item.timestamp.toDate(), timePeriod);
                if (!acc[dateLabel]) {
                    acc[dateLabel] = [];
                }
                acc[dateLabel].push(item);
            } catch (error) {
                console.error('Error formatting timestamp for item:', item, error);
            }
            return acc;
        }, {});

        const averagedData = uniqueLabels.map((label) => {
            const items = groupedData[label] || [];
            const totalValue = items.reduce((sum, item) => sum + item[valueKey], 0);
            const averageValue = items.length > 0 ? totalValue / items.length : 0;
            return { label, average: averageValue };
        });

        const hue = index * (360 / values.length);

        return {
            label: value,
            data: averagedData.map((data) => data.average),
            borderColor: `hsl(${hue}, 70%, 50%)`,
            backgroundColor: `hsla(${hue}, 70%, 50%, 0.2)`,
            fill: true,
            spanGaps: true,
        };
    });

    const filteredDatasets = selectedValue === 'All' ? datasets : datasets.filter((dataset) => dataset.label === selectedValue);

    return { labels: uniqueLabels, datasets: filteredDatasets };
};

const filterUniqueDays = (labels) => {
    const uniqueLabels = [];
    const seen = new Set();
    labels.forEach((label) => {
        const day = label.split(',')[0].trim();
        if (!seen.has(day)) {
            seen.add(day);
            uniqueLabels.push(label);
        }
    });
    return uniqueLabels;
};
