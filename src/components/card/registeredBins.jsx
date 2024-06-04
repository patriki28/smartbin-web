import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import AddBinModal from '../modal/AddBinModal';

export default function RegisteredBins({ binsData }) {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const latestBinsData = [...binsData].reverse().slice(0, 5);

    return (
        <div>
            <Card className="w-fit rounded-5 p-2 my-2">
                <Card.Body>
                    <div className="flex flex-wrap justify-center items-center gap-3">
                        <h1 className="text-2xl font-bold">Registered Bins</h1>
                        <Button variant="dark" size="lg" onClick={handleShow}>
                            Add bin
                        </Button>
                    </div>
                    <ul className="my-4 space-y-3">
                        {latestBinsData.map((bin, index) => (
                            <li key={index}>
                                <a
                                    href="#"
                                    className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow"
                                >
                                    <span className="flex-1 ms-3 whitespace-nowrap">{bin.id}</span>
                                    <span
                                        className={`inline-flex items-center justify-center px-2 py-0.5 ms-3 text-md font-medium text-white ${bin.isActive ? 'bg-lime-700' : 'bg-red-500'} rounded`}
                                    >
                                        {bin.isActive ? 'true' : 'false'}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </Card.Body>
            </Card>
            <AddBinModal show={showModal} handleClose={handleClose} />
        </div>
    );
}
