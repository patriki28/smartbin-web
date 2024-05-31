import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

const ProtectedRoutes = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.emailVerified) {
                    navigate('/home/dashboard');
                } else {
                    alert('Verify your email first');
                    navigate('/');
                }
            } else {
                navigate('/');
            }
        });
        return () => {
            listen();
        };
    }, []);

    return <>{children}</>;
};

export default ProtectedRoutes;
