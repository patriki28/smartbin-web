import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { auth } from '../../../firebase';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { Form, Button, Spinner } from 'react-bootstrap';
import PasswordInput from '../input/passwordInput';

export default function ChangePasswordCard() {
    const [loading, setLoading] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);

        if (!currentPassword || !newPassword || !confirmPassword) return alert('All fields are required!');
        if (newPassword !== confirmPassword) return alert('New password and confirmation password do not match.');

        try {
            if (auth.currentUser) {
                const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
                await reauthenticateWithCredential(auth.currentUser, credential);

                await updatePassword(auth.currentUser, newPassword);

                alert('You have successfully changed your password');
            }
        } catch (error) {
            console.log(error);
            let errorMessage = 'An error occurred in changing your password.';

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
        <Card style={{ maxWidth: '700px' }} className="w-full rounded-5 p-2 my-2">
            <Card.Body>
                <h2 className="text-2xl font-bold">Change Password</h2>
                <p>Password must be atleast 6 characters.</p>
                <hr className="my-2" />
                <Form onSubmit={handleChangePassword}>
                    <Form.Group controlId="currentPassword" className="mt-2">
                        <Form.Label>
                            Current Password <span className="text-red-500">*</span>
                        </Form.Label>
                        <PasswordInput
                            value={currentPassword}
                            placeholder="Enter your current password"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="newPassword" className="mt-2">
                        <Form.Label>
                            New Password <span className="text-red-500">*</span>
                        </Form.Label>
                        <PasswordInput value={newPassword} placeholder="Enter a new password" onChange={(e) => setNewPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="confirmPassword" className="mt-2">
                        <Form.Label>
                            Confirm New Password <span className="text-red-500">*</span>
                        </Form.Label>
                        <PasswordInput
                            value={confirmPassword}
                            placeholder="Confirm your new password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <div className="flex flex-row justify-end">
                        <Button variant="dark mt-3" type="submit" size="lg" disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : 'Change Password'}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}
