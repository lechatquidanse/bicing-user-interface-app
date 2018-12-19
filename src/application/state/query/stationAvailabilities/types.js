import {
  CANCELLED, FAILURE, PENDING, START, SUCCESS,
} from 'application/state/stateConstants';
import { defineAction } from 'redux-define';

export const FETCH = defineAction(
  'FETCH',
  [START, PENDING, CANCELLED, SUCCESS, FAILURE],
  defineAction('query/stationAvailabilities'),
);

export default FETCH;
