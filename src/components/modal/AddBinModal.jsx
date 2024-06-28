import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import QRCode from 'react-qr-code';
import { toast } from 'react-toastify';
import { db } from '../../../firebase';

export default function AddBinModal({ show, handleClose }) {
    const [binName, setBinName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddBin = async () => {
        if (loading) return;

        if (!binName) return toast.error('You have to enter a bin name');

        setLoading(true);

        try {
            const binDocRef = doc(db, 'bins', binName);
            const binDocSnap = await getDoc(binDocRef);

            if (binDocSnap.exists()) {
                toast.error('Bin name already exists. Please choose a different name.');
                setBinName('');
                return;
            }

            await setDoc(binDocRef, { userIds: [] });

            toast.success('You have successfully added a bin');
            setBinName('');
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Bin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="flex justify-center qr-code">
                    <QRCode value={binName} size={256} />
                </div>
                <Form>
                    <Form.Group>
                        <Form.Label>Bin Name</Form.Label>
                        <Form.Control
                            type="text"
                            size="lg"
                            placeholder="Enter bin name"
                            value={binName}
                            onChange={(e) => setBinName(e.target.value)}
                            maxLength={20}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button size="lg" variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="dark" size="lg" onClick={handleAddBin}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Save Changes'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
