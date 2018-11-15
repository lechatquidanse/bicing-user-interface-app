import { createReducer } from 'reduxsauce'
import produce from 'immer';

import * as Types from 'application/state/flow/station/types';

export const INITIAL_STATE = { error: false, station: {}, availabilities: [] };

export const fetchStationStart = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    draft.payload = action.payload
  })
};

export const fetchStationSuccess = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    draft.payload = action.payload
  })
}

export const HANDLERS = {
  [Types.FETCH_STATION.START]: fetchStationStart,
  [Types.FETCH_STATION.SUCCESS]: fetchStationSuccess,
}

export default createReducer(INITIAL_STATE, HANDLERS);
