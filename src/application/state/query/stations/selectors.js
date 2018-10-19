export const stations = (state) => state.query.stations;
export const stationsData = (state) => state.query.stations.stations;
export const stationsDataList = (state) => {
    const stations = state.query.stations.stations;

    return stations['hydra:member'] ? stations['hydra:member'] : [];
};
