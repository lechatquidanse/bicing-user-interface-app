export const isFetchingSelector = (state) => state.query.stations.payload.isFetching;
export const stationsSelector = (state) => {
    const stations = state.query.stations.data;

    return stations && stations['hydra:member'] ? stations['hydra:member'] : null;
};
