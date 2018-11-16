import { createReducer } from 'reduxsauce'
import produce from 'immer';

import * as Types from 'application/state/flow/map/types';

export const INITIAL_STATE = { error: null, data: null };

export const fetchMapStart = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    draft.payload = action.payload
  })
};

export const fetchMapSuccess = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    draft.payload = action.payload
  })
}

export const HANDLERS = {
  [Types.FETCH_MAP.START]: fetchMapStart,
  [Types.FETCH_MAP.SUCCESS]: fetchMapSuccess,
}

export default createReducer(INITIAL_STATE, HANDLERS);
