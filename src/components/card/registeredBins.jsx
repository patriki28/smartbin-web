import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaRegTrashAlt } from 'react-icons/fa';
import { db } from '../../../firebase';
import AddBinModal from '../modal/AddBinModal';

export default function RegisteredBins({ binsData }) {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const latestBinsData = [...binsData].reverse().slice(0, 5);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this bin?')) return;

        try {
            await deleteDoc(doc(db, 'bins', id));

            //find all the fill-levels and delete the reports with same bin.id
            const fillLevelsQuery = query(collection(db, 'fill-levels'), where('bin', '==', id));
            const querySnapshot = await getDocs(fillLevelsQuery);

            querySnapshot.forEach(async (documentSnapshot) => {
                await deleteDoc(doc(db, 'fill-levels', documentSnapshot.id));
            });

            alert(`Bin with ID ${id} has been deleted`);
        } catch (error) {
            console.error(error);
            alert('Error deleting bin');
        }
    };

    return (
        <div>
            <Card className="w-fit rounded-5 p-2 my-2">
                <Card.Body>
                    <div className="flex flex-wrap justify-center items-center gap-3">
                        <h1 className="text-2xl font-bold">Registered Bins</h1>
                        <Button variant="dark" size="lg" onClick={handleShow}>
                            Add Bin
                        </Button>
                    </div>
                    <ul className="my-4 space-y-3">
                        {latestBinsData.length === 0 ? (
                            <li>
                                <p className="text-center text-gray-500">No registered bins available</p>
                            </li>
                        ) : (
                            latestBinsData.map((bin, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow"
                                    >
                                        <span className="flex-1 ms-3 whitespace-nowrap">{bin.id}</span>
                                        <span
                                            className={`inline-flex items-center justify-center px-2 py-0.5 ms-3 text-md font-medium text-white ${bin.userIds.length !== 0 ? 'bg-lime-700' : 'bg-red-500'} rounded`}
                                        >
                                            {bin.userIds.length !== 0 ? 'Active' : 'Inactive'}
                                        </span>
                                        <FaRegTrashAlt className="ml-2 cursor-pointer" size={20} onClick={() => handleDelete(bin.id)} />
                                    </a>
                                </li>
                            ))
                        )}
                    </ul>
                </Card.Body>
            </Card>
            <AddBinModal show={showModal} handleClose={handleClose} />
        </div>
    );
}
