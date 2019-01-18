import { STORE } from 'application/state/command/storeItineraryAt/types';
import produce from 'immer';
import { createReducer } from 'reduxsauce';

export const INITIAL_STATE = {
  data: undefined,
  error: false,
};

export const storeStart = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  draft.data = undefined;
  draft.error = action.error;
});

export const storeSuccess = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  draft.data = action.payload;
  draft.error = action.error;
});

export const storeFailure = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  draft.error = action.error;
  draft.data = action.payload;
});

export const HANDLERS = {
  [STORE.START]: storeStart,
  [STORE.SUCCESS]: storeSuccess,
  [STORE.FAILURE]: storeFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
