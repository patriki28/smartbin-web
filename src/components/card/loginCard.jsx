import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button, Image, Spinner } from 'react-bootstrap';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import PasswordInput from '../input/passwordInput';
import Logo from '../../assets/logo/logo.png';

export default function LoginCard() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (loading) return;

        setLoading(true);

        if (!email || !password) return alert('Please fill up all fields!');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user.emailVerified) {
                alert('You have successfully logged in!');
            } else {
                alert('Please verify your email to login.');
            }

            navigate('/home/dashboard');
        } catch (error) {
            console.log(error);
            let errorMessage = 'An error occurred during login.';

            if (error.code === 'auth/user-not-found') {
                errorMessage = 'User not found. Please check your email address.';
            } else if (error.code === 'auth/invalid-credential') {
                errorMessage = 'Invalid credentials provided. Please check your email and password.';
            }

            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (loading) return;

        setLoading(true);

        if (!email) return alert('Please enter your email first!');

        try {
            await sendPasswordResetEmail(auth, email);

            alert('Password reset email sent');
        } catch (error) {
            console.log(error);
            if (error.code === 'auth/user-not-found') {
                alert('User not found. Please check your email address.');
            } else {
                alert('Error sending password reset email. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card style={{ width: '800px' }} className="rounded-5 p-2">
            <Card.Body>
                <div className="flex items-center">
                    <Image src={Logo} width={100} />
                    <h1 className="text-5xl font-bold">Smart Bin Management</h1>
                </div>
                <p className="text-xl my-2">Login to continue to manage your smart bin.</p>
                <hr />
                <Form className="mt-2">
                    <Form.Group controlId="formBasicEmail" className="mb-2">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            size="lg"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="link" onClick={handleForgotPassword} className="mt-1 fs-5 fw-semibold text-decoration-none">
                            Forgot Password?
                        </Button>
                    </div>
                    <Button size="lg" onClick={handleLogin} disabled={loading} variant="dark w-100 mt-2 fw-semibold flex justify-center items-center">
                        {loading ? <Spinner animation="border" size={20} /> : 'Login'}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}
