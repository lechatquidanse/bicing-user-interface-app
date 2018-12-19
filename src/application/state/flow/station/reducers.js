import { FLOW } from 'application/state/flow/station/types';
import produce from 'immer';
import { createReducer } from 'reduxsauce';

export const INITIAL_STATE = { error: false, station: null, availabilities: null };

export const fetchStationStart = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  draft.payload = action.payload;
});

export const fetchStationSuccess = (state = INITIAL_STATE, action) => produce(state, (draft) => {
  draft.payload = action.payload;
});

export const HANDLERS = {
  [FLOW.START]: fetchStationStart,
  [FLOW.SUCCESS]: fetchStationSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS);
