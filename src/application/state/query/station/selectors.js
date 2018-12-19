const selector = state => state.query.station;

export const data = state => state.query.station.data;
export const error = state => selector(state).error;
export const isFetching = state => selector(state).isFetching;
