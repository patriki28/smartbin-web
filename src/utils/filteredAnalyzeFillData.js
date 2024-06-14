export default function filteredAnalyzeFillData(data) {
    return data
        .map(({ bin, percentage, timestamp }) => ({
            bin_type: bin,
            fill_level: percentage,
            fill_level_timestamp: timestamp.toDate(),
        }))
        .slice(0, 25);
}
