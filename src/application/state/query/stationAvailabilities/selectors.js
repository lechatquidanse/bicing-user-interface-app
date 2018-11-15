import moment from "moment";

export const stationAvailabilitiesData = (state) => state.query.stationAvailabilities.stationAvailabilities;

export const stationAvailabilitiesDataList = (state) => {
    const stationAvailabilities = stationAvailabilitiesData(state);

    return stationAvailabilities['availabilities'] ? stationAvailabilities['availabilities'] : [];
};

export const stationAvailabilitiesFilterAsDate = (state) => {
    const stationAvailabilities = stationAvailabilitiesData(state);

    if (stationAvailabilities.length === 0) {
        return {};
    }
    //@todo add more test access key
    return {
        datePeriodStart: moment(stationAvailabilities['filter'].periodStart, 'YYYY-MM-DD HH:mm:ss'),
        datePeriodEnd: moment(stationAvailabilities['filter'].periodEnd, 'YYYY-MM-DD HH:mm:ss'),
        interval: stationAvailabilities['filter'].interval
    }
};

export const stationAvailabilitiesSorted = (state) => {
    const availabilities = stationAvailabilitiesDataList(state);

    if (availabilities.length === 0) {
        return [];
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
