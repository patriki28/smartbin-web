import formatDate from '../utils/formatDate';

export const fillColumnsData = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'bin', headerName: 'Bin', flex: 1 },
    { field: 'bin_type', headerName: 'Bin Type', flex: 1 },
    {
        field: 'percentage',
        headerName: 'Percentage',
        type: 'number',
        flex: 1,
    },
    {
        field: 'time_stamp',
        headerName: 'Date and time',
        type: 'date',
        flex: 1,
        valueGetter: (params) => new Date(params.value),
        valueFormatter: (params) => {
            const date = new Date(params.value);
            return formatDate(date);
        },
    },
];
