import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Loader from '../../../components/Loader';
import RegisteredBinCard from '../../../components/card/registeredBinCard';
import AddBinModal from '../../../components/modal/AddBinModal';
import useFetchData from '../../../hooks/useFetchData';
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
                <h1 className="text-3xl font-bold mb-3">Registered Bins</h1>
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

            <div className="flex flex-wrap gap-3">
                {filteredData.map((bin) => (
                    <div key={bin.id}>
                        <RegisteredBinCard bin={bin} />
                    </div>
                ))}
            </div>

            <AddBinModal show={showModal} handleClose={handleClose} />
        </div>
    );
}
