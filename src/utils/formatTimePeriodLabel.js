import formatDate from './formatDate';

export default function formatTimePeriodLabel(date, timePeriod) {
    if (timePeriod === 'daily') {
        return formatDate(date);
    } else if (timePeriod === 'weekly') {
        const weekNumber = Math.ceil(date.getDate() / 7);
        return `${date.toLocaleString('default', { month: 'short' })} Week ${weekNumber}`;
    } else if (timePeriod === 'monthly') {
        return date.toLocaleString('default', { month: 'long' });
    }
    return formatDate(date);
}
