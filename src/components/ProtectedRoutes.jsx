import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

const ProtectedRoutes = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.emailVerified) {
                    setAuthUser(user);
                    navigate('/home/dashboard');
                } else {
                    alert('Verify your email first');
                    navigate('/');
                }
            } else {
                setAuthUser(null);
                navigate('/');
            }
        });
        return () => {
            listen();
        };
    }, [authUser]);

    return <>{children}</>;
};

export default ProtectedRoutes;
