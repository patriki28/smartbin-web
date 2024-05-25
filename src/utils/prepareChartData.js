export const prepareChartData = (data, filterBy, values, valueKey) => {
    const labels = [...new Set(data.map((item) => new Date(item.time_stamp).toLocaleString()))];

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
};
