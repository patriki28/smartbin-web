export const prepareChartData = (data, filterBy, values, valueKey, labelBy) => {
    const generateLabels = () => {
        if (labelBy === 'time_stamp') {
            return [...new Set(data.map((item) => new Date(item.time_stamp).toLocaleString()))];
        } else {
            return [...new Set(data.map((item) => item[filterBy]))];
        }
    };

    const labels = generateLabels();

    if (labelBy === 'time_stamp') {
        const datasets = values.map((value, index) => {
            const valueData = data.filter((item) => item[filterBy] === value);
            const valueValues = labels.map((label) => {
                const items = valueData.filter((d) => new Date(d.time_stamp).toLocaleString() === label);
                return valueKey ? (items.length > 0 ? items[0][valueKey] : null) : items.length;
            });

            const hue = index * (360 / values.length);
            return {
                label: value,
                data: valueValues,
                borderColor: `hsl(${hue}, 70%, 50%)`,
                backgroundColor: `hsla(${hue}, 70%, 50%, 0.2)`,
                fill: true,
                spanGaps: true,
            };
        });

        return { labels, datasets };
    } else {
        const datasets = values.map((value, index) => {
            const aggregatedData = labels.map((label) => {
                const filteredItems = data.filter((item) => item[filterBy] === label);
                return filteredItems.reduce((acc, item) => acc + (item[filterBy] === value ? (valueKey ? item[valueKey] : 1) : 0), 0);
            });

            const hue = index * (360 / values.length);
            return {
                label: value,
                data: aggregatedData,
                backgroundColor: `hsla(${hue}, 70%, 50%, 0.5)`,
                borderColor: `hsl(${hue}, 70%, 50%)`,
                borderWidth: 1,
            };
        });

        return { labels, datasets };
    }
};
