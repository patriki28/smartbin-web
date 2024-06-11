import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { auth, db } from '../../../firebase';
import { decrypt, encrypt } from '../../utils/encryption';

export default function AddUserModal({ show, handleClose }) {
    const encryptedPassword = sessionStorage.getItem('password');

    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddUser = async () => {
        if (loading) return;

        setLoading(true);

        let decryptedPassword;
        const originalUser = auth.currentUser;
        const originalUserEmail = originalUser?.email;

        if (encryptedPassword) {
            decryptedPassword = decrypt(encryptedPassword);
        } else {
            decryptedPassword = prompt('Please re-enter your password for security purposes');
            if (!decryptedPassword) {
                setLoading(false);
                return;
            }
            sessionStorage.setItem('password', encrypt(decryptedPassword));
        }

        if (!firstName || !lastName || !email) {
            setLoading(false);
            return alert('Please fill out all fields.');
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), `${lastName.toLowerCase()}-${firstName.toLowerCase()}`);

            await setDoc(doc(db, 'users', userCredential.user.uid), {
                firstName: firstName.trim(),
                middleName: middleName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                role: 'user',
                created_at: Timestamp.now().toDate().toISOString(),
            });

            await sendEmailVerification(userCredential.user);
            await signInWithEmailAndPassword(auth, originalUserEmail, decryptedPassword);
            alert('You have successfully added a user');
            handleClose();
        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            size="lg"
                            placeholder="Enter first name"
                            value={firstName}
                            name="firstName"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Middle Name</Form.Label>
                        <Form.Control
                            type="text"
                            size="lg"
                            placeholder="Enter middle name"
                            value={middleName}
                            name="middleName"
                            onChange={(e) => setMiddleName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            size="lg"
                            placeholder="Enter last name"
                            value={lastName}
                            name="lastName"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            size="lg"
                            placeholder="Enter email"
                            value={email}
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button size="lg" variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="dark" size="lg" onClick={handleAddUser}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Save Changes'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
