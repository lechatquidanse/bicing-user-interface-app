const selector = state => state.query.stations;

export const data = state => selector(state).data;
export const error = state => selector(state).error;
export const isFetching = state => selector(state).isFetching;
export const latitude = state => selector(state).latitude;
export const longitude = state => selector(state).longitude;
export const limit = state => selector(state).limit;

export const stationById = (state, id) => (data(state) === undefined
  ? undefined : data(state).find(station => station.id === id));

const property = (state, propertyKey, id) => (stationById(state, id) === undefined
  ? undefined : stationById(state, id)[propertyKey]);

export const nameByStationId = (state, stationId) => property(state, 'name', stationId);
export const zipCodeByStationId = (state, stationId) => property(state, 'zipCode', stationId);
export const typeByStationId = (state, stationId) => property(state, 'type', stationId);
export const latitudeByStationId = (state, stationId) => property(state, 'latitude', stationId);
export const longitudeByStationId = (state, stationId) => property(state, 'longitude', stationId);
