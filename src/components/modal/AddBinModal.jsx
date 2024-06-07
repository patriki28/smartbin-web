import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { db } from '../../../firebase';

export default function AddBinModal({ show, handleClose }) {
    const [binName, setBinName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddBin = async () => {
        if (loading) return;

        if (!binName) return alert('You have to enter a bin name');

        setLoading(true);

        try {
            await setDoc(doc(db, 'bins', binName), { isActive: false, userId: '' });
            alert('You have succesfully added a bin');
            setBinName('');
        } catch (error) {
            console.log(error);
            alert(error);
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
                <Form>
                    <Form.Group>
                        <Form.Label>Bin Name</Form.Label>
                        <Form.Control
                            type="text"
                            size="lg"
                            placeholder="Enter bin name"
                            value={binName}
                            onChange={(e) => setBinName(e.target.value)}
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
