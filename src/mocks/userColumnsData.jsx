import { Button } from 'react-bootstrap';
import { handleStatusToggle } from '../utils/handleStatusToggle';

export const usersColumnsData = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'middleName', headerName: 'Middle Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        valueGetter: (params) => (params.row.isDisabled ? 'Disabled' : 'Active'),
    },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        renderCell: (params) => (
            <div>
                <Button
                    variant={params.row.isDisabled ? 'success' : 'danger'}
                    size="sm"
                    onClick={() => handleStatusToggle(params.row.id, !params.row.isDisabled)}
                >
                    {params.row.isDisabled ? 'Enable' : 'Disable'}
                </Button>
            </div>
        ),
    },
];
