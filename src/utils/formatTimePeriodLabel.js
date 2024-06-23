export default function formatTimePeriodLabel(date, timePeriod) {
    if (!(date instanceof Date)) {
        console.error('Invalid date:', date);
        return '';
    }
    if (timePeriod === 'daily') {
        return date.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });
    } else if (timePeriod === 'weekly') {
        const weekNumber = Math.ceil(date.getDate() / 7);
        return `${date.toLocaleString('default', { month: 'short' })} Week ${weekNumber}`;
    } else if (timePeriod === 'monthly') {
        return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    }
    return date.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });
}
