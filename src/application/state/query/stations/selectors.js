/* eslint-disable */
const selector = state => state.query.stations.itinerarySteps;

const step = (itineraryStep, state) =>
  selector(state).find((step) => step.itineraryStep === itineraryStep);

const data = (itineraryStep, state) =>
  step(itineraryStep, state) === undefined ? undefined : step(itineraryStep, state).data;

export const stationByItineraryStepAndId = (itineraryStep, id, state) => {
  if (isErrorByItineraryStep(itineraryStep, state) === true
    || step(itineraryStep, state) === undefined
    || step(itineraryStep, state).data === undefined) {
    return undefined;
  }

  return step(itineraryStep, state).data.find(model => model.id === id);
};

export const stationPropertyByKeyAndItineraryStepAndId = (state, key, itineraryStep, id) =>
  stationByItineraryStepAndId(itineraryStep, id, state) === undefined ?
    undefined :
    stationByItineraryStepAndId(itineraryStep, id, state)[key];

//////////////////////////////
//// Interfaced selectors ////
//////////////////////////////
export const itinerarySteps = state => [...new Set(selector(state).map(
  step => step.itineraryStep))
];

export const isErrorByItineraryStep = itineraryStep => state =>
  step(itineraryStep, state) === undefined ? false : step(itineraryStep, state).error;

export const errorByItineraryStep = itineraryStep => state =>
  isErrorByItineraryStep(itineraryStep)(state) === true
  && data(itineraryStep, state) instanceof Error ?
    data(itineraryStep, state).message : undefined;

export const isFetchingByItineraryStep = itineraryStep => state =>
  step(itineraryStep, state) === undefined ? false : step(itineraryStep, state).isFetching;


export const latitudeByItineraryStep = itineraryStep => state =>
  step(itineraryStep,state) === undefined ?
    undefined :
    step(itineraryStep, state).latitude;

export const longitudeByItineraryStep = itineraryStep => state =>
  step(itineraryStep,state) === undefined ?
    undefined :
    step(itineraryStep, state).longitude;

export const limitByItineraryStep = itineraryStep => state =>
  step(itineraryStep,state) === undefined ?
    undefined :
    step(itineraryStep, state).limit;

export const stationIdsByItineraryStep = itineraryStep => state => {
  if (step(itineraryStep, state) === undefined
    || step(itineraryStep, state).data === undefined
    || Array.isArray(step(itineraryStep, state).data) === false) {
    return undefined;
  }else {
    return [...new Set(step(itineraryStep, state).data.map(station => station.id))];
  }
};

export const nameByItineraryStepAndStationId = (itineraryStep, stationId) => state =>
  stationPropertyByKeyAndItineraryStepAndId(
    state,
    'name',
    itineraryStep,
    stationId);
export const zipCodeByItineraryStepAndStationId = (itineraryStep, stationId) => state =>
  stationPropertyByKeyAndItineraryStepAndId(
    state,
    'zipCode',
    itineraryStep,
    stationId);
export const typeByItineraryStepAndStationId = (itineraryStep, stationId) => state =>
  stationPropertyByKeyAndItineraryStepAndId(
    state,
    'type',
    itineraryStep,
    stationId);
export const latitudeByItineraryStepAndStationId = (itineraryStep, stationId) => state =>
  stationPropertyByKeyAndItineraryStepAndId(
    state,
    'latitude',
    itineraryStep,
    stationId);
export const longitudeByItineraryStepAndStationId = (itineraryStep, stationId) => state =>
  stationPropertyByKeyAndItineraryStepAndId(
    state,
    'longitude',
    itineraryStep,
    stationId);
