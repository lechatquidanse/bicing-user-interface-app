const selector = state => state.query.reverseGeoCode;
const data = state => selector(state).data;

export const isFetching = state => selector(state).isFetching;
export const isError = state => selector(state).error;

const address = state => (isError(state) === true ? undefined : data(state));
const error = state => (isError(state) === true && data(state) instanceof Error
  ? data(state).message : undefined);

export const addressOrError = state => (address(state) === undefined
  ? error(state) : address(state));
