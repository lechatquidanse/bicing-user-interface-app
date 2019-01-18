import AppError from 'domain/errors/AppError';

const selector = state => state.query.geoSuggestions;

const data = state => selector(state).data;

// ////////////////////////////
// // Interfaced selectors ////
// ////////////////////////////
export const isError = state => selector(state).error;

export const error = state => (isError(state) === true && data(state) instanceof AppError
  ? data(state).publicMessage : undefined);

export const geoSuggestions = (state) => {
  if (isError(state) === true || Array.isArray(data(state)) === false) {
    return [];
  }

  return data(state).map(geoSuggestion => ({
    label: geoSuggestion.name,
    location: { lat: geoSuggestion.latitude, lng: geoSuggestion.longitude },
  }));
};
