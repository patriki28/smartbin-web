import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Loader from '../../../components/Loader';
import useFetchData from '../../../hooks/useFetchData';
import { fillColumnsData } from '../../../mocks/fillColumnsData';
import { wasteTypeData } from '../../../mocks/wasteTypeData';
import { filterDataBySearchQuery } from '../../../utils/filterDataBySearchQuery';

export default function ReportAnalyticsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBin, setSelectedBin] = useState('All');
    const [selectedWasteType, setSelectedWasteType] = useState('All');
    const { data: fillLevelsData, loading: fillLevelsLoading, error: fillLevelsError } = useFetchData('fill-levels');
    const { data: binsData, loading: binsLoading, error: binsError } = useFetchData('bins');

    if (fillLevelsLoading || binsLoading) return <Loader />;

    if (fillLevelsError) return <div>{fillLevelsError}</div>;
    if (binsError) return <div>{binsError}</div>;

    const binIds = binsData.map((bin) => bin.id);
    const filteredDataByBins = fillLevelsData
        .filter((item) => selectedBin === 'All' || item.bin === selectedBin)
        .filter((item) => selectedWasteType === 'All' || item.bin_type === selectedWasteType);

    const filteredData = filterDataBySearchQuery(filteredDataByBins, searchQuery);

    return (
        <div>
            <h1 className="w-full text-3xl font-bold mb-3">Smart Bin Reports</h1>

            <div className="flex flex-row items-end justify-center gap-2 mb-3">
                <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                />
                <div>
                    <p className="font-semibold mb-1">Filter by bin:</p>
                    <Form.Control
                        size="lg"
                        as="select"
                        className="w-fit px-4 "
                        value={selectedBin}
                        onChange={(event) => setSelectedBin(event.target.value)}
                    >
                        <option value="All">All Bins</option>
                        {binIds.map((binId) => (
                            <option key={binId} value={binId}>
                                {binId}
                            </option>
                        ))}
                    </Form.Control>
                </div>
                <div>
                    <p className="font-semibold mb-1">Filter by waste:</p>
                    <Form.Control
                        size="lg"
                        as="select"
                        className="w-fit px-4 "
                        value={selectedWasteType}
                        onChange={(event) => setSelectedWasteType(event.target.value)}
                    >
                        <option value="All">All Type</option>
                        {wasteTypeData.map((waste) => (
                            <option key={waste} value={waste}>
                                {waste}
                            </option>
                        ))}
                    </Form.Control>
                </div>
            </div>
            <DataGrid
                rows={filteredData}
                columns={fillColumnsData}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[10, 20, 30, 40, 50]}
                autoHeight
            />
        </div>
    );
}
