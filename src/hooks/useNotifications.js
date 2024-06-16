import { addDoc, collection, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';

export default function useNotifications() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const unsubscribeFillLevel = onSnapshot(collection(db, 'fill_level_data'), async (querySnapshot) => {
                    for (const doc of querySnapshot.docs) {
                        const { bin, bin_type, timestamp, percentage } = doc.data();
                        const fillLevelDataId = doc.id;

                        if (percentage === 100) {
                            const title = `${bin}(${bin_type}) is already full`;

                            const notificationQuery = query(collection(db, 'notifications'), where('fill_id', '==', fillLevelDataId));
                            const notificationSnapshot = await getDocs(notificationQuery);

                            if (notificationSnapshot.empty) {
                                await addDoc(collection(db, 'notifications'), {
                                    title,
                                    timestamp: timestamp,
                                    isRead: false,
                                    bin_id: bin,
                                    fill_id: fillLevelDataId,
                                });
                            }
                        }
                    }

                    setLoading(false);
                });

                return unsubscribeFillLevel;
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        const fetchNotifications = async () => {
            try {
                const unsubscribeNotifications = onSnapshot(collection(db, 'notifications'), async (querySnapshot) => {
                    for (const doc of querySnapshot.docs) {
                        const { title, isRead } = doc.data();

                        if (isRead === false) {
                            await alert(title);
                            await updateDoc(doc.ref, { isRead: true });
                        }
                    }
                });

                return unsubscribeNotifications;
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        const unsubscribeFetchData = fetchData();
        const unsubscribeFetchNotifications = fetchNotifications();

        return () => {
            unsubscribeFetchData?.();
            unsubscribeFetchNotifications?.();
        };
    }, []);

    return { loading, error };
}
