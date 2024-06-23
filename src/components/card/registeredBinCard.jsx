import { useRef } from 'react';
import { Button, Card } from 'react-bootstrap';
import QRCode from 'react-qr-code';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { handleDeleteBins } from '../../utils/handleDeleteBin';
export default function RegisteredBinCard({ bin }) {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <Card className="w-full rounded-5 p-2 my-2" style={{ minWidth: 300 }}>
            <div className="flex p-2 flex-col justify-center items-center" ref={componentRef}>
                <QRCode value={bin.id} />
                <h1 className="mt-2 text-2xl font-semibold">{bin.id}</h1>
            </div>

            <div className="mt-2 flex flex-wrap gap-2 justify-center items-center">
                <Button onClick={handlePrint}>Print</Button>

                <Link to={`/home/reports-analytics/${bin.id}`} className="btn btn-dark">
                    Reports
                </Link>

                <Button variant="danger" onClick={() => handleDeleteBins(bin.id)}>
                    Delete
                </Button>
            </div>
        </Card>
    );
}
