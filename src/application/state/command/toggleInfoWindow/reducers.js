import { TOGGLE } from 'application/state/command/toggleInfoWindow/types';
import produce from 'immer';
import { createReducer } from 'reduxsauce';

export const INITIAL_STATE = {
  key: null,
};

export const toggle = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  draft.key = action.payload.key;
});

export const HANDLERS = {
  [TOGGLE.START]: toggle,
};

export default createReducer(INITIAL_STATE, HANDLERS);
