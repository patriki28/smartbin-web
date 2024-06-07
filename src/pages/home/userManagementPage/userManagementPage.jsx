import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Loader from '../../../components/Loader';
import AddUserModal from '../../../components/modal/AddUserModal';
import useFetchData from '../../../hooks/useFetchData';
import { userColumnsData } from '../../../mocks/userColumnData';
import { filterDataBySearchQuery } from '../../../utils/filterDataBySearchQuery';

export default function UserManagementPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { data, loading, error } = useFetchData('users');

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;

    const userData = data.filter((user) => user.role === 'user');
    const filteredData = filterDataBySearchQuery(userData, searchQuery);

    return (
        <div>
            <div className="flex flex-col justify-center items-center sm:justify-between sm:flex-row gap-3 mb-3">
                <h1 className="text-3xl font-bold">User Management</h1>
                <Button size="lg" variant="dark" onClick={() => setShowModal(true)}>
                    Add user
                </Button>
            </div>
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
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[10, 20, 30, 40, 50]}
                autoHeight
            />
            <AddUserModal show={showModal} handleClose={() => setShowModal(false)} />
        </div>
    );
}
