import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export async function handleStatusToggle(userId, newStatus) {
    try {
        if (!window.confirm('Are you sure you want to perform this action?')) return;
        const userDocRef = doc(db, 'users', userId);
        await updateDoc(userDocRef, {
            isDisabled: newStatus,
        });
        alert('User status updated successfully.');
    } catch (error) {
        console.error('Error updating user status: ', error);
    }
}
