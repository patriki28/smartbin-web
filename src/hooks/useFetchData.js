import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

export default function useFetchData(collectionName) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!collectionName) {
                setError(new Error('No collection name provided'));
                setLoading(false);
                return;
            }

            try {
                const unsubscribe = onSnapshot(collection(db, collectionName), (querySnapshot) => {
                    const documents = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setData(documents);
                    setLoading(false);
                });

                return () => unsubscribe();
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, [collectionName]);

    return { data, loading, error };
}
