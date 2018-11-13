export const stationAvailabilities = (state) => state.query.stationAvailabilities;
export const stationAvailabilitiesData = (state) => state.query.stationAvailabilities.stationAvailabilities;
export const stationAvailabilitiesDataList = (state) => {
    const stationAvailabilities = state.query.stationAvailabilities.stationAvailabilities;

    return stationAvailabilities['availabilities'] ? stationAvailabilities['availabilities'] : [];
};
