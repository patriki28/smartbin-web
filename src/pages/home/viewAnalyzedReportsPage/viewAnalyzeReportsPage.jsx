import { useRef } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import Loader from '../../../components/Loader';
import useFetchData from '../../../hooks/useFetchData';
import formatDate from '../../../utils/formatDate';
import { formatReportText } from '../../../utils/formatReportText';
import { sortDate } from '../../../utils/sortDate';
import PageNotFoundPage from '../../pageNotFoundPage/pageNotFoundPage';

export default function ViewAnalyzeReportsPage() {
    const { id } = useParams();
    const { data, loading } = useFetchData('reports');
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    if (loading) return <Loader />;
    if (!id) return <PageNotFoundPage />;

    const filteredData = sortDate(data)
        .filter((report) => report.bin_id === id)
        .reverse();

    return (
        <div className="text-xl">
            <h1 className="w-full text-3xl font-bold mb-3">Reports for {id}</h1>

            {filteredData.length === 0 ? (
                <div>No reports available for this bin.</div>
            ) : (
                filteredData.map((report) => (
                    <Card key={report.id} className="mb-3 text-gray-500 ">
                        <Card.Body ref={componentRef} className="p-2">
                            <p>{formatDate(report.timestamp)}</p>

                            <div className="text-left text-gray-700" dangerouslySetInnerHTML={{ __html: formatReportText(report.report_text) }} />
                        </Card.Body>
                        <Card.Footer>
                            <Button onClick={handlePrint} size="lg" variant="dark">
                                Print Report
                            </Button>
                        </Card.Footer>
                    </Card>
                ))
            )}
        </div>
    );
}
