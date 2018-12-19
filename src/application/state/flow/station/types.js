import {
  CANCELLED, FAILURE, PENDING, START, SUCCESS,
} from 'application/state/stateConstants';
import { defineAction } from 'redux-define';

export const FLOW = defineAction(
  'FLOW',
  [START, PENDING, CANCELLED, SUCCESS, FAILURE],
  defineAction('flow/station'),
);

export default FLOW;
