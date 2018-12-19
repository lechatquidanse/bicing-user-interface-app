import {
  FAILURE, PENDING, START, SUCCESS,
} from 'application/state/stateConstants';
import { defineAction } from 'redux-define';

export const FLOW = defineAction(
  'FLOW',
  [START, PENDING, SUCCESS, FAILURE],
  defineAction('flow/map'),
);

export default FLOW;
