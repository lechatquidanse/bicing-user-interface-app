const selector = state => state.query.stations;

export const data = state => selector(state).data;
export const error = state => selector(state).error;
export const isFetching = state => selector(state).isFetching;
export const byGeoLocationFilter = state => selector(state).byGeoLocationFilter;
export const stations = (state) => {
  const stationsData = data(state);

  return stationsData && stationsData['hydra:member'] ? stationsData['hydra:member'] : null;
};
