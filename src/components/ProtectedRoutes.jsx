import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import useNotifications from '../hooks/useNotifications';
import Loader from './Loader';

export default function ProtectedRoutes({ children }) {
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();
    const { loading } = useNotifications();

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
                navigate('/home/dashboard');
            } else {
                setAuthUser(null);
                navigate('/');
            }
        });
        return () => {
            listen();
        };
    }, [authUser]);

    return <>{loading ? <Loader /> : children}</>;
}
