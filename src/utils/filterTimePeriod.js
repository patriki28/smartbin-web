export default function filterTimePeriod(data, timePeriod) {
    return data.filter((item) => {
        if (timePeriod === 'daily') return true;
        const date = new Date(item.time_stamp);
        const now = new Date();
        if (timePeriod === 'weekly') {
            const weekAgo = new Date(now);
            weekAgo.setDate(now.getDate() - 7);
            return date >= weekAgo;
        } else if (timePeriod === 'monthly') {
            const monthAgo = new Date(now);
            monthAgo.setMonth(now.getMonth() - 1);
            return date >= monthAgo;
        }
        return true;
    });
}
