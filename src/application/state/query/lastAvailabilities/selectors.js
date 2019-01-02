const selector = state => state.query.lastAvailabilities;

export const data = state => selector(state).data;
export const error = state => selector(state).error;
export const isFetching = state => selector(state).isFetching;

export const lastAvailabilityById = (state, id) => (data(state) === undefined
  ? undefined : data(state).find(model => model.id === id));

const property = (state, propertyKey, id) => (lastAvailabilityById(state, id) === undefined
  ? undefined : lastAvailabilityById(state, id)[propertyKey]);

export const statusByStationId = (state, stationId) => property(state, 'status', stationId);
export const availableBikeNumberByStationId = (state, stationId) => property(state, 'availableBikeNumber', stationId);
export const availableSlotNumberByStationId = (state, stationId) => property(state, 'availableSlotNumber', stationId);
