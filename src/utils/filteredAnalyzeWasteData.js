export default function filteredAnalyzeWasteData(data) {
    return data
        .map(({ type, timestamp }) => ({
            type,
            timestamp: timestamp.toDate(),
        }))
        .slice(0, 25);
}
