export const sortDate = (data) => {
    return [...data].sort((a, b) => {
        const dateA = a.timestamp ? a.timestamp.toDate() : new Date(0);
        const dateB = b.timestamp ? b.timestamp.toDate() : new Date(0);
        return dateA - dateB;
    });
};
