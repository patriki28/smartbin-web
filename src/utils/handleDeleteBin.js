import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

export const handleDeleteBins = async (id) => {
    if (!window.confirm('Are you sure you want to delete this bin?')) return;

    try {
        await deleteDoc(doc(db, 'bins', id));

        const fillLevelsQuery = query(collection(db, 'fill_level_data'), where('bin', '==', id));
        const wasteDataQuery = query(collection(db, 'waste_data'), where('bin_id', '==', id));
        const reportsQuery = query(collection(db, 'reports'), where('bin_id', '==', id));
        const notificationsQuery = query(collection(db, 'notifications'), where('bin_id', '==', id));

        const deleteDocuments = async (querySnapshot, collectionName) => {
            querySnapshot.forEach(async (documentSnapshot) => {
                await deleteDoc(doc(db, collectionName, documentSnapshot.id));
            });
        };

        const fillLevelsSnapshot = await getDocs(fillLevelsQuery);
        const wasteDataSnapshot = await getDocs(wasteDataQuery);
        const reportsSnapshot = await getDocs(reportsQuery);
        const notificationsSnapshot = await getDocs(notificationsQuery);

        await Promise.all([
            deleteDocuments(fillLevelsSnapshot, 'fill_level_data'),
            deleteDocuments(wasteDataSnapshot, 'waste_data'),
            deleteDocuments(reportsSnapshot, 'reports'),
            deleteDocuments(notificationsSnapshot, 'notifications'),
        ]);

        alert(`Bin with ID ${id} has been deleted`);
    } catch (error) {
        console.error(error);
        alert('Error deleting bin');
    }
};
