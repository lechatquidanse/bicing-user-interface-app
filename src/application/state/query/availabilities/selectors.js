/* eslint-disable */
const selector = state => state.query.availabilities.itinerarySteps;
const step = (state, itineraryStep) =>
  selector(state).find((step) => step.itineraryStep === itineraryStep);

export const availabilityByItineraryStepAndId = (state, itineraryStep, id) => {
  if (isErrorByItineraryStep(state, itineraryStep)
    || step(state, itineraryStep) === undefined
    || step(state, itineraryStep).data === undefined) {
    return undefined;
  }

  return step(state, itineraryStep).data.find(model => model.id === id);
};
export const availabilityPropertyByKeyAndItineraryStepAndId = (state, key, itineraryStep, id) =>
  availabilityByItineraryStepAndId(state, itineraryStep, id) === undefined ?
    undefined :
    availabilityByItineraryStepAndId(state, itineraryStep, id)[key];

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
export const periodStartByItineraryStep = (state, itineraryStep) =>
  step(state, itineraryStep).periodStart === undefined ?
    undefined :
    step(state, itineraryStep).periodStart;
export const periodEndByItineraryStep = (state, itineraryStep) =>
  step(state, itineraryStep).periodEnd === undefined ?
    undefined :
    step(state , itineraryStep).periodEnd;
export const intervalByItineraryStep = (state, itineraryStep) =>
  step(state, itineraryStep).interval === undefined ?
    undefined :
    step(state, itineraryStep).interval;
export const stationIdsByItineraryStep = (state, itineraryStep) =>
  step(state, itineraryStep).stationIds === undefined ?
    undefined :
    step(state, itineraryStep).stationIds;

//@todo add itineray selected
// export const itineraryDateByItineraryStep = (state, itineraryStep) =>
//   step(state, itineraryStep).stationIds === undefined ?
//     undefined :
//     step(state, itineraryStep).stationIds;

export const statusByItineraryStepAndStationId = (state, itineraryStep, stationId) =>
  availabilityPropertyByKeyAndItineraryStepAndId(
    state,
    'status',
    itineraryStep,
    stationId);
export const availableBikeNumberByItineraryStepAndStationId = (state, itineraryStep, stationId) =>
  availabilityPropertyByKeyAndItineraryStepAndId(
    state,
    'availableBikeNumber',
    itineraryStep,
    stationId);
export const availableSlotNumberByItineraryStepAndStationId = (state, itineraryStep, stationId) =>
  availabilityPropertyByKeyAndItineraryStepAndId(
    state,
    'availableSlotNumber',
    itineraryStep,
    stationId);
