export const isFetchingSelector = (state) => state.query.stationAvailabilities.payload.isFetching;
export const dataSelector = (state) => state.query.stationAvailabilities.data;
export const filterSelector = (state) => {
    const data = dataSelector(state);

    return data && data['filter'] ? data['filter'] : null;
};
export const stationAvailabilitiesSelector = (state) => {
    const data = dataSelector(state);

    return data && data['availabilities'] ? data['availabilities'] : null;
};
export const stationAvailabilitiesSortedSelector = (state) => {
    const availabilities = stationAvailabilitiesSelector(state);

    if (availabilities === null) {
        return null;
    }

    const datasetslabels = [];
    const datasetsAvailableSlotMin = [], datasetsAvailableSlotMax = [], datasetsAvailableSlotAvg = [];
    const datasetsAvailableBikeMin = [], datasetsAvailableBikeMax = [], datasetsAvailableBikeAvg = [];

    availabilities.map(availability => {
        datasetslabels.push(availability['interval']);
        datasetsAvailableSlotMin.push(availability['available_slot_min']);
        datasetsAvailableSlotMax.push(availability['available_slot_max']);
        datasetsAvailableSlotAvg.push(availability['available_slot_avg']);
        datasetsAvailableBikeMin.push(availability['available_bike_min']);
        datasetsAvailableBikeMax.push(availability['available_bike_max']);
        datasetsAvailableBikeAvg.push(availability['available_bike_avg']);
    });

    return {
        datasetslabels,
        datasetsAvailableSlotMin,
        datasetsAvailableSlotMax,
        datasetsAvailableSlotAvg,
        datasetsAvailableBikeMin,
        datasetsAvailableBikeMax,
        datasetsAvailableBikeAvg,
    };
};
