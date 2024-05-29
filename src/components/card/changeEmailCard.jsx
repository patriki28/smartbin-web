import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { auth } from '../../../firebase';
import { EmailAuthProvider, reauthenticateWithCredential, verifyBeforeUpdateEmail, signOut } from 'firebase/auth';
import { Form, Button, Spinner } from 'react-bootstrap';
import PasswordInput from '../input/passwordInput';

export default function ChangeEmailCard() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeEmail = async (e) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);

        try {
            if (auth.currentUser.email === email) return alert("You can't change your email to your current email");

            if (auth.currentUser) {
                const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
                await reauthenticateWithCredential(auth.currentUser, credential);

                await verifyBeforeUpdateEmail(auth.currentUser, email);

                alert('Please verify your new email to change your email!');
                signOut(auth);
            }
        } catch (error) {
            console.log(error);
            let errorMessage = 'An error occurred in changing your email.';

            if (error.code === 'auth/user-not-found') {
                errorMessage = 'User not found!';
            } else if (error.code === 'auth/invalid-credential') {
                errorMessage = 'Invalid credentials provided. Please enter your current password.';
            }

            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card style={{ maxWidth: '800px' }} className="rounded-5 p-2 my-2">
            <Card.Body>
                <h2 className="text-2xl font-bold">Change Email</h2>
                <p>After you successfully changed your email, you would be immediately sign out to verify your new email</p>
                <hr className="my-2" />
                <Form onSubmit={handleChangeEmail}>
                    <Form.Group controlId="email" className="mt-2">
                        <Form.Label>Email: </Form.Label>
                        <Form.Control size="lg" value={email} placeholder="Enter a new email" onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="currentPassword" className="mt-2">
                        <Form.Label>Current Password</Form.Label>
                        <PasswordInput value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="dark mt-3" type="submit" size="lg" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : 'Change Email'}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}
