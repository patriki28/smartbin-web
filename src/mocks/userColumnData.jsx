import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { handleStatusToggle } from '../utils/handleStatusToggle';

export const userColumnsData = [
    { field: 'id', headerName: 'ID', minWidth: 200, flex: 1 },
    {
        field: 'profilePicture',
        headerName: 'Avatar',
        minWidth: 100,
        renderCell: (params) => (
            <div>
                <img
                    src={
                        params.row.profilePicture
                            ? params.row.profilePicture
                            : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
                    }
                    alt={`${params.row.firstName} ${params.row.lastName}`}
                    className="w-10 h-10 rounded-full object-cover"
                />
            </div>
        ),
    },
    { field: 'firstName', headerName: 'First Name', minWidth: 200, flex: 1 },
    { field: 'middleName', headerName: 'Middle Name', minWidth: 200, flex: 1 },
    { field: 'lastName', headerName: 'Last Name', minWidth: 200, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 200, flex: 1 },
    {
        field: 'status',
        headerName: 'Status',
        minWidth: 200,
        flex: 1,
        valueGetter: (params) => (params.row.isDisabled ? 'Disabled' : 'Active'),
    },
    {
        field: 'actions',
        headerName: 'Actions',
        minWidth: 200,
        flex: 1,
        renderCell: (params) => (
            <div className="flex gap-2">
                <Link to={`/home/user-monitored-bins/${params.row.id}`} className="btn btn-dark">
                    View
                </Link>
                <Button
                    variant={params.row.isDisabled ? 'success' : 'danger'}
                    onClick={() => handleStatusToggle(params.row.id, !params.row.isDisabled)}
                >
                    {params.row.isDisabled ? 'Enable' : 'Disable'}
                </Button>
            </div>
        ),
    },
];
