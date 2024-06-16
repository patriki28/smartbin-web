import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Loader from '../../../components/Loader';
import AddBinModal from '../../../components/modal/AddBinModal';
import useFetchData from '../../../hooks/useFetchData';
import { binColumnsData } from '../../../mocks/binColumnsData';
import { filterDataBySearchQuery } from '../../../utils/filterDataBySearchQuery';

export default function RegisteredBinsPage() {
    const { data, loading, error } = useFetchData('bins');
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const filteredData = filterDataBySearchQuery(data, searchQuery);

    return (
        <div>
            <div className="flex flex-col justify-center items-center sm:justify-between sm:flex-row gap-3 mb-3">
                <h1 className="text-2xl font-bold">Registered Bins</h1>
                <Button variant="dark" size="lg" onClick={handleShow}>
                    Add Bin
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
                columns={binColumnsData}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[10, 20, 30, 40, 50]}
                autoHeight
            />

            <AddBinModal show={showModal} handleClose={handleClose} />
        </div>
    );
}
