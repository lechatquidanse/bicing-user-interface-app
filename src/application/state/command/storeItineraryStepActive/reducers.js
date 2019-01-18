import { STORE } from 'application/state/command/storeItineraryStepActive/types';
import produce from 'immer';
import { createReducer } from 'reduxsauce';

export const INITIAL_STATE = {
  itineraryStep: 0,
};

export const store = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  draft.itineraryStep = action.payload;
});

export const HANDLERS = {
  [STORE.START]: store,
};

export default createReducer(INITIAL_STATE, HANDLERS);
