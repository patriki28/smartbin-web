export default function formatDate(dateValue) {
    if (!dateValue) return '';

    let dateObject;

    if (dateValue.toDate) {
        dateObject = dateValue.toDate();
    } else if (dateValue instanceof Date) {
        dateObject = dateValue;
    } else if (typeof dateValue === 'string') {
        dateObject = new Date(dateValue);
    } else {
        return '';
    }

    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return dateObject.toLocaleDateString(undefined, options);
}
