import { FETCH } from 'application/state/query/availabilities/types';
import produce from 'immer';
import { createReducer } from 'reduxsauce';

export const initialStateByItineraryStep = itineraryStep => ({
  data: undefined,
  error: false,
  isFetching: false,
  itineraryStep,
});

export const INITIAL_STATE = {
  itinerarySteps: [],
};

const findIndexByItineraryStep = (itineraryStep, itinerarySteps) => itinerarySteps.findIndex(
  step => step.itineraryStep === itineraryStep,
);

export const fetchStart = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  const { isFetching, itineraryStep } = action.meta;

  const draftByItineraryStep = initialStateByItineraryStep(itineraryStep);

  draftByItineraryStep.data = undefined;
  draftByItineraryStep.isFetching = isFetching;
  draftByItineraryStep.error = action.error;

  const index = findIndexByItineraryStep(itineraryStep, draft.itinerarySteps);

  if (index !== -1) {
    draft.itinerarySteps[index] = draftByItineraryStep;
  } else {
    draft.itinerarySteps.push(draftByItineraryStep);
  }
});

export const fetchPending = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  const index = findIndexByItineraryStep(action.meta.itineraryStep, draft.itinerarySteps);

  if (index !== -1) {
    const draftByItineraryStep = draft.itinerarySteps[index];

    draftByItineraryStep.data = undefined;
    draftByItineraryStep.isFetching = action.meta.isFetching;
    draftByItineraryStep.error = action.error;

    draft.itinerarySteps[index] = draftByItineraryStep;
  }
});

export const fetchSuccess = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  const index = findIndexByItineraryStep(action.meta.itineraryStep, draft.itinerarySteps);

  if (index !== -1) {
    const draftByItineraryStep = draft.itinerarySteps[index];

    draftByItineraryStep.data = action.payload;
    draftByItineraryStep.isFetching = action.meta.isFetching;
    draftByItineraryStep.error = action.error;

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
