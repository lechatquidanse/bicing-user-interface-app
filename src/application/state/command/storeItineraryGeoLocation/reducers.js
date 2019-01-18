import { STORE } from 'application/state/command/storeItineraryGeoLocation/types';
import produce from 'immer';
import { createReducer } from 'reduxsauce';

const initialStateByItineraryStep = itineraryStep => ({
  data: undefined,
  error: false,
  itineraryStep,
});

export const INITIAL_STATE = {
  itinerarySteps: [
    initialStateByItineraryStep(0),
    initialStateByItineraryStep(1),
  ],
};

const findIndexByItineraryStep = (itineraryStep, itinerarySteps) => itinerarySteps.findIndex(
  step => step.itineraryStep === itineraryStep,
);

export const storeStart = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  const draftByItineraryStep = initialStateByItineraryStep(action.meta);

  draftByItineraryStep.data = undefined;
  draftByItineraryStep.error = action.error;

  const index = findIndexByItineraryStep(action.meta, draft.itinerarySteps);

  if (index !== -1) {
    draft.itinerarySteps[index] = draftByItineraryStep;
  } else {
    draft.itinerarySteps.push(draftByItineraryStep);
  }
});

export const storeSuccess = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  const index = findIndexByItineraryStep(action.meta, draft.itinerarySteps);

  if (index !== -1) {
    const draftByItineraryStep = draft.itinerarySteps[index];

    draftByItineraryStep.data = action.payload;
    draftByItineraryStep.error = action.error;
  }
});

export const storeFailure = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  const index = findIndexByItineraryStep(action.meta, draft.itinerarySteps);

  if (index !== -1) {
    const draftByItineraryStep = draft.itinerarySteps[index];

    draftByItineraryStep.data = action.payload;
    draftByItineraryStep.error = action.error;
  }
});

export const HANDLERS = {
  [STORE.START]: storeStart,
  [STORE.SUCCESS]: storeSuccess,
  [STORE.FAILURE]: storeFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
