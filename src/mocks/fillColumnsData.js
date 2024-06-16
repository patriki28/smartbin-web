import formatDate from '../utils/formatDate';

export const fillColumnsData = [
    { field: 'id', headerName: 'ID', minWidth: 100, flex: 1 },
    { field: 'bin', headerName: 'Bin', minWidth: 150, flex: 1 },
    { field: 'bin_type', headerName: 'Bin Type', minWidth: 100, flex: 1 },
    {
        field: 'percentage',
        headerName: 'Percentage',
        type: 'number',
        minWidth: 100,
        flex: 1,
    },
    {
        field: 'timestamp',
        headerName: 'Date and time',
        minWidth: 200,
        flex: 1,
        valueGetter: (params) => params.value.toDate(),
        valueFormatter: (params) => {
            const date = new Date(params.value);
            return formatDate(date);
        },
    },
];
