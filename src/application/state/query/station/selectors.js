const selector = state => state.query.station;

export const data = state => selector(state).data;
export const error = state => selector(state).error;
export const isFetching = state => selector(state).isFetching;

const isData = state => data(state) !== undefined;

export const name = state => (isData(state) ? data(state).name : undefined);
export const type = state => (isData(state) ? data(state).type : undefined);
export const address = state => (isData(state) ? data(state).address : undefined);
export const addressNumber = state => (isData(state) ? data(state).addressNumber : undefined);
export const zipCode = state => (isData(state) ? data(state).zipCode : undefined);
