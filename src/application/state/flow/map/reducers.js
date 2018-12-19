import { FLOW } from 'application/state/flow/map/types';
import produce from 'immer';
import { createReducer } from 'reduxsauce';

export const INITIAL_STATE = {
  byGeoLocationFilter: null,
  error: false,
};

export const flowStart = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  draft.byGeoLocationFilter = action.payload.byGeoLocationFilter;
});

export const flowSuccess = (state = INITIAL_STATE) => produce(state, () => {
});

export const flowFailure = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  draft.data = action.payload;
  draft.error = action.error;
});

export const HANDLERS = {
  [FLOW.START]: flowStart,
  [FLOW.SUCCESS]: flowSuccess,
  [FLOW.FAILURE]: flowFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
