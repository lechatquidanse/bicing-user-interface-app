/* eslint-disable */
const selector = state => state.query.stations.itinerarySteps;
const step = (state, itineraryStep) =>
  selector(state).find((step) => step.itineraryStep === itineraryStep);

export const stationByItineraryStepAndId = (state, itineraryStep, id) => {
  if (isErrorByItineraryStep(state, itineraryStep)
    || step(state, itineraryStep) === undefined
    || step(state, itineraryStep).data === undefined) {
    return undefined;
  }

  return step(state, itineraryStep).data.find(model => model.id === id);
};
export const stationPropertyByKeyAndItineraryStepAndId = (state, key, itineraryStep, id) =>
  stationByItineraryStepAndId(state, itineraryStep, id) === undefined ?
    undefined :
    stationByItineraryStepAndId(state, itineraryStep, id)[key];

//////////////////////////////
//// Interfaced selectors ////
//////////////////////////////

export const isErrorByItineraryStep = (state, itineraryStep) =>
  step(state, itineraryStep) === undefined ? false : step(state, itineraryStep).error;
export const errorByItineraryStep = (state, itineraryStep) =>
  isErrorByItineraryStep(state, itineraryStep) === false || step(state, itineraryStep) === undefined ?
    undefined :
    step(state, itineraryStep).data;
export const isFetchingByItineraryStep = (state, itineraryStep) =>
  step(state, itineraryStep) === undefined ? false : step(state, itineraryStep).isFetching;
export const latitudeByItineraryStep = (state, itineraryStep) =>
  step(state, itineraryStep).latitude === undefined ?
    undefined :
    step(state, itineraryStep).latitude;
export const longitudeByItineraryStep = (state, itineraryStep) =>
  step(state, itineraryStep).longitude === undefined ?
    undefined :
    step(state, itineraryStep).longitude;
export const limitByItineraryStep = (state, itineraryStep) =>
  step(state, itineraryStep).limit === undefined ?
    undefined :
    step(state, itineraryStep).limit;

export const stationIdsByItineraryStep = (state, itineraryStep) =>
  step(state, itineraryStep).data === undefined ?
    undefined :
    [...new Set(step(state, itineraryStep).data.map(station => station.id))];

export const nameByItineraryStepAndStationId = (state, itineraryStep, stationId) =>
  stationPropertyByKeyAndItineraryStepAndId(
    state,
    'name',
    itineraryStep,
    stationId);
export const zipCodeByItineraryStepAndStationId = (state, itineraryStep, stationId) =>
  stationPropertyByKeyAndItineraryStepAndId(
    state,
    'zipCode',
    itineraryStep,
    stationId);
export const typeByItineraryStepAndStationId = (state, itineraryStep, stationId) =>
  stationPropertyByKeyAndItineraryStepAndId(
    state,
    'type',
    itineraryStep,
    stationId);
export const latitudeByItineraryStepAndStationId = (state, itineraryStep, stationId) =>
  stationPropertyByKeyAndItineraryStepAndId(
    state,
    'latitude',
    itineraryStep,
    stationId);
export const longitudeByItineraryStepAndStationId = (state, itineraryStep, stationId) =>
  stationPropertyByKeyAndItineraryStepAndId(
    state,
    'longitude',
    itineraryStep,
    stationId);
