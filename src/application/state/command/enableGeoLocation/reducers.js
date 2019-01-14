import { ENABLE } from 'application/state/command/enableGeoLocation/types';
import produce from 'immer';
import { createReducer } from 'reduxsauce';

export const INITIAL_STATE = {
  enabled: false,
  itineraryStep: 0,
};

export const enable = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  draft.enabled = action.payload.enabled;
  draft.itineraryStep = action.payload.itineraryStep;
});

export const HANDLERS = {
  [ENABLE.START]: enable,
};

export default createReducer(INITIAL_STATE, HANDLERS);
