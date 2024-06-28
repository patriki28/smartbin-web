import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../../firebase';

export async function handleStatusToggle(userId, newStatus) {
    try {
        if (!window.confirm('Are you sure you want to perform this action?')) return;
        const userDocRef = doc(db, 'users', userId);
        await updateDoc(userDocRef, {
            isDisabled: newStatus,
        });
        toast.success('User status updated successfully.');
    } catch (error) {
        console.error('Error updating user status: ', error);
    }
}
