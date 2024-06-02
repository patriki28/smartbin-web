import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Form } from 'react-bootstrap';
import { userColumnsData } from '../../../mocks/userColumnData';
import { filterDataBySearchQuery } from '../../../utils/filterDataBySearchQuery';
import useFetchData from '../../../hooks/useFetchData';
import Loader from '../../../components/Loader';

export default function UserManagementPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const { data, loading, error } = useFetchData('users');

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;

    const userData = data.filter((user) => user.role === 'user');
    const filteredData = filterDataBySearchQuery(userData, searchQuery);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-3">User Management</h1>
            <Form.Control
                size="lg"
                type="text"
                placeholder="Search"
                className="mb-3"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
            />
            <DataGrid
                rows={filteredData}
                columns={userColumnsData}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                autoHeight
            />
        </div>
    );
}
