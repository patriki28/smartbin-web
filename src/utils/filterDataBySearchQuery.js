export const filterDataBySearchQuery = (data, query) => {
    return data.filter((item) => Object.values(item).some((value) => String(value).toLowerCase().includes(query.toLowerCase())));
};
