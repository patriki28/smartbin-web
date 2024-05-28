import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Form } from 'react-bootstrap';
import { fillColumnsData } from '../../../mocks/fillColumnsData';
import { filterDataBySearchQuery } from '../../../utils/filterDataBySearchQuery';
import useFetchData from '../../../hooks/useFetchData';
import Loader from '../../../components/Loader';

export default function ReportAnalyticsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const { data, loading, error } = useFetchData('fill-levels');

    if (loading) return <Loader />;

    if (error) return <div>{error}</div>;

    const filteredData = filterDataBySearchQuery(data, searchQuery);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Smart Bin Reports</h1>
            <Form.Control
                type="text"
                placeholder="Search"
                className="mb-2"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
            />
            <DataGrid
                rows={filteredData}
                columns={fillColumnsData}
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
