import AppError from 'domain/errors/AppError';

const selector = state => state.query.station;

const data = state => selector(state).data;
const isData = state => data(state) !== undefined;

// ////////////////////////////
// // Interfaced selectors ////
// ////////////////////////////
export const isError = state => selector(state).error;

export const error = state => (isError(state) === true && data(state) instanceof AppError
  ? data(state).publicMessage : undefined);

export const isFetching = state => selector(state).isFetching;

export const name = state => (isData(state) ? data(state).name : undefined);
export const type = state => (isData(state) ? data(state).type : undefined);
export const address = state => (isData(state) ? data(state).address : undefined);
export const addressNumber = state => (isData(state) ? data(state).addressNumber : undefined);
export const zipCode = state => (isData(state) ? data(state).zipCode : undefined);
