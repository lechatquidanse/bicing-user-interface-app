import { DISPLAY } from 'application/state/command/map/types';
import produce from 'immer';
import { createReducer } from 'reduxsauce';

export const INITIAL_STATE = {
  filter: null,
  error: false,
  isDisplaying: false,
  data: null,
};

// @todo check if destructure in start or success
export const displayStart = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  draft.isDisplaying = action.meta.isDisplaying;
  draft.filter = action.payload.byGeoLocationFilter;
});

export const displaySuccess = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  draft.isDisplaying = action.meta.isDisplaying;
});

export const displayFailure = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  draft.error = true;
  draft.data = action.payload;
  draft.isDisplaying = action.meta.isDisplaying;
});

export const HANDLERS = {
  [DISPLAY.START]: displayStart,
  [DISPLAY.SUCCESS]: displaySuccess,
  [DISPLAY.FAILURE]: displayFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
