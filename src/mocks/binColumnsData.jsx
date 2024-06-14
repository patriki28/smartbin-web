import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { handleDeleteBins } from '../utils/handleDeleteBin';

export const binColumnsData = [
    { field: 'id', headerName: 'ID', minWidth: 200, flex: 1 },
    {
        field: 'status',
        headerName: 'Status',
        minWidth: 200,
        flex: 1,
        valueGetter: (params) => (params.row.userIds?.length !== 0 ? 'Active' : 'Inactive'),
    },
    {
        field: 'actions',
        headerName: 'Actions',
        minWidth: 200,
        flex: 1,
        renderCell: (params) => (
            <div className="flex gap-2">
                <Link to={`/home/reports-analytics/${params.id}`} className="btn btn-dark">
                    View Reports
                </Link>
                <Button variant="danger" onClick={() => handleDeleteBins(params.row.id)}>
                    Delete
                </Button>
            </div>
        ),
    },
];
