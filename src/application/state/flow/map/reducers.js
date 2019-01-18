import { FLOW } from 'application/state/flow/map/types';
import produce from 'immer';
import { createReducer } from 'reduxsauce';

const INITIAL_STATE = {};

export const flow = (state = INITIAL_STATE) => produce(state, () => {});

export const HANDLERS = {
  [FLOW.START]: flow,
};

export default createReducer(INITIAL_STATE, HANDLERS);
