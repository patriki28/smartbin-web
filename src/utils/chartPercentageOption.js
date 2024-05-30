export const chartPercentageOptions = {
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
