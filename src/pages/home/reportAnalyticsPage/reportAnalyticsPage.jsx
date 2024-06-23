import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth, db } from '../../../../firebase';
import Loader from '../../../components/Loader';
import useFetchData from '../../../hooks/useFetchData';
import useTimeCheck from '../../../hooks/useTimeCheck';
import { fillColumnsData } from '../../../mocks/fillColumnsData';
import { wasteTypeData } from '../../../mocks/wasteTypeData';
import { filterDataBySearchQuery } from '../../../utils/filterDataBySearchQuery';
import filteredAnalyzeFillData from '../../../utils/filteredAnalyzeFillData';
import filteredAnalyzeWasteData from '../../../utils/filteredAnalyzeWasteData';
import { sortDate } from '../../../utils/sortDate';
import NoRegisterPage from '../noRegisterBinPage/noRegisterPage';

export default function ReportAnalyticsPage() {
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBin, setSelectedBin] = useState('');
    const [selectedWasteType, setSelectedWasteType] = useState('All');
    const { data: fillLevelsData, loading: fillLevelsLoading } = useFetchData('fill_level_data');
    const { data: wasteData, loading: wasteLoading } = useFetchData('waste_data');
    const { data: binsData, loading: binsLoading } = useFetchData('bins');
    const isButtonDisabled = useTimeCheck();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (binsData && binsData.length > 0) {
            setSelectedBin(binsData[0].id);
        }
    }, [binsData]);

    if (fillLevelsLoading || wasteLoading || binsLoading || !userId) return <Loader />;

    if (binsData.length === 0) return <NoRegisterPage />;

    const binIds = binsData.map((bin) => bin.id);
    const filteredDataByBins = sortDate(fillLevelsData)
        .filter((item) => item.bin === selectedBin)
        .filter((item) => selectedWasteType === 'All' || item.bin_type === selectedWasteType);

    const filteredWasteDataByBins = sortDate(wasteData)
        .filter((item) => item.bin_id === selectedBin)
        .filter((item) => selectedWasteType === 'All' || item.type === selectedWasteType);

    const fill = filterDataBySearchQuery(filteredDataByBins, searchQuery);
    const waste = filterDataBySearchQuery(filteredWasteDataByBins, searchQuery);

    const fillFilterData = filteredAnalyzeFillData(fill);
    const wasteFilterData = filteredAnalyzeWasteData(waste);

    const handleAnalyzeData = async () => {
        if (loading) return;

        setLoading(true);

        try {
            await setDoc(doc(db, 'users', userId), { lastRequestTime: new Date() }, { merge: true });

            const response = await axios.post(import.meta.env.VITE_ANALYZE_DATA_API_URL, {
                waste_data: JSON.stringify(wasteFilterData),
                fill_level_data: JSON.stringify(fillFilterData),
                api_key: import.meta.env.VITE_ANALYZE_API_KEY,
                open_ai_api_key: import.meta.env.VITE_OPEN_AI_API_KEY,
            });

            await addDoc(collection(db, 'reports'), { bin_id: 'smart_bin_001', report_text: response.data.message, timestamp: serverTimestamp() });

            alert('Analyzed data successfully');
        } catch (error) {
            console.error('Error storing timestamp: ', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="w-full text-3xl font-bold mb-3">Smart Bin Reports</h1>

            <div className="flex flex-col items-center justify-center gap-2 mb-3 sm:flex-row sm:items-end">
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
                        className="w-fit px-4"
                        value={selectedBin}
                        onChange={(event) => setSelectedBin(event.target.value)}
                    >
                        {binIds.length === 0 ? (
                            <option disabled>No bins available</option>
                        ) : (
                            binIds.map((binId) => (
                                <option key={binId} value={binId}>
                                    {binId}
                                </option>
                            ))
                        )}
                    </Form.Control>
                </div>
                <div>
                    <p className="font-semibold mb-1">Filter by waste:</p>
                    <Form.Control
                        size="lg"
                        as="select"
                        className="w-fit px-4"
                        value={selectedWasteType}
                        onChange={(event) => setSelectedWasteType(event.target.value)}
                    >
                        <option value="All">All Types</option>
                        {wasteTypeData.map((waste) => (
                            <option key={waste} value={waste}>
                                {waste}
                            </option>
                        ))}
                    </Form.Control>
                </div>
                <Button variant="dark" size="lg" onClick={handleAnalyzeData} disabled={loading || isButtonDisabled}>
                    {loading ? <Spinner animation="border" size={20} /> : 'Analyze'}
                </Button>
                <Link to={`/home/reports-analytics/${selectedBin}`} className="btn btn-lg py-2 btn-dark ">
                    View
                </Link>
            </div>
            <DataGrid
                rows={fill}
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
