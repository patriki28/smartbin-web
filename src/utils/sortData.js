export const sortData = (data) => data.sort((a, b) => new Date(a.time_stamp) - new Date(b.time_stamp));
