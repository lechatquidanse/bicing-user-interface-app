import { FETCH } from 'application/state/query/stations/types';
import produce from 'immer';
import { createReducer } from 'reduxsauce';

export const INITIAL_STATE = {
  itinerarySteps: [],
};

const findIndexByItineraryStep = (itineraryStep, itinerarySteps) => itinerarySteps.findIndex(
  step => step.itineraryStep === itineraryStep,
);

export const fetchStart = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  const { itineraryStep } = action.meta;
  const draftByItineraryStep = {
    data: undefined,
    error: false,
    isFetching: action.meta.isFetching,
    itineraryStep,
    latitude: action.payload.latitude,
    longitude: action.payload.longitude,
    limit: action.payload.limit,
  };

  const index = findIndexByItineraryStep(action.meta.itineraryStep, draft.itinerarySteps);

  if (index === -1) {
    draft.itinerarySteps.push(draftByItineraryStep);
  } else {
    draft.itinerarySteps[index] = draftByItineraryStep;
  }
});

export const fetchPending = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  const index = findIndexByItineraryStep(action.meta.itineraryStep, draft.itinerarySteps);

  if (index !== -1) {
    const draftByItineraryStep = draft.itinerarySteps[index];

    draftByItineraryStep.isFetching = action.meta.isFetching;

    draft.itinerarySteps[index] = draftByItineraryStep;
  }
});

export const fetchSuccess = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  const index = findIndexByItineraryStep(action.meta.itineraryStep, draft.itinerarySteps);

  if (index !== -1) {
    const draftByItineraryStep = draft.itinerarySteps[index];

    draftByItineraryStep.isFetching = action.meta.isFetching;
    draftByItineraryStep.data = action.payload;

    draft.itinerarySteps[index] = draftByItineraryStep;
  }
});

export const fetchFailure = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  const index = findIndexByItineraryStep(action.meta.itineraryStep, draft.itinerarySteps);

  if (index !== -1) {
    const draftByItineraryStep = draft.itinerarySteps[index];

    draftByItineraryStep.data = action.payload;
    draftByItineraryStep.error = action.error;
    draftByItineraryStep.isFetching = action.meta.isFetching;
  }
});

const HANDLERS = {
  [FETCH.START]: fetchStart,
  [FETCH.PENDING]: fetchPending,
  [FETCH.SUCCESS]: fetchSuccess,
  [FETCH.FAILURE]: fetchFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
