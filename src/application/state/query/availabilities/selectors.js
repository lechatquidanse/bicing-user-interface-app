/* eslint-disable */
const selector = state => state.query.availabilities.itinerarySteps;

const step = (itineraryStep, state) =>
  selector(state).find((step) => step.itineraryStep === itineraryStep);

const data = (itineraryStep, state) =>
  step(itineraryStep, state) === undefined ? undefined : step(itineraryStep, state).data;

export const availabilityByItineraryStepAndId = (itineraryStep, id, state) => {
  if (isErrorByItineraryStep(itineraryStep, state) === true
    || step(itineraryStep, state) === undefined
    || step(itineraryStep, state).data === undefined) {
    return undefined;
  }

  return step(itineraryStep, state).data.find(model => model.id === id);
};

export const availabilityPropertyByKeyAndItineraryStepAndId = (state, key, itineraryStep, id) =>
  availabilityByItineraryStepAndId(itineraryStep, id, state) === undefined ?
    undefined :
    availabilityByItineraryStepAndId(itineraryStep, id, state)[key];

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

export const periodStartAtByItineraryStep = itineraryStep => state =>
  step(itineraryStep,state) === undefined ?
    undefined :
    step(itineraryStep, state).periodStartAt;

export const periodEndAtByItineraryStep = itineraryStep => state =>
  step(itineraryStep, state) === undefined ?
    undefined :
    step(itineraryStep, state).periodEndAt;

export const intervalByItineraryStep = itineraryStep => state =>
  step(itineraryStep, state) === undefined ?
    undefined :
    step(itineraryStep, state).interval;

export const itineraryAtByItineraryStep = itineraryStep => state =>
  step(itineraryStep, state) === undefined ?
    undefined :
    step(itineraryStep, state).itineraryAt;

export const statusByItineraryStepAndStationId = (itineraryStep, stationId) => state =>
  availabilityPropertyByKeyAndItineraryStepAndId(
    state,
    'status',
    itineraryStep,
    stationId);
export const availableBikeNumberByItineraryStepAndStationId = (itineraryStep, stationId) => state =>
  availabilityPropertyByKeyAndItineraryStepAndId(
    state,
    'availableBikeNumber',
    itineraryStep,
    stationId);
export const availableSlotNumberByItineraryStepAndStationId = (itineraryStep, stationId) => state =>
  availabilityPropertyByKeyAndItineraryStepAndId(
    state,
    'availableSlotNumber',
    itineraryStep,
    stationId);
