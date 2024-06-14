import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';

export default function useTimeCheck() {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);

                const unsubscribeSnapshot = onSnapshot(userDocRef, (docSnap) => {
                    if (docSnap.exists()) {
                        const { lastRequestTime } = docSnap.data() || {};
                        if (lastRequestTime) {
                            const lastRequestDate = new Date(lastRequestTime.seconds * 1000);
                            const now = new Date();

                            const oneHour = 60 * 60 * 1000;
                            setIsButtonDisabled(now - lastRequestDate < oneHour);
                        } else {
                            setIsButtonDisabled(false);
                        }
                    }
                });

                return () => unsubscribeSnapshot();
            }
        });

        return () => unsubscribeAuth();
    }, []);

    return isButtonDisabled;
}
