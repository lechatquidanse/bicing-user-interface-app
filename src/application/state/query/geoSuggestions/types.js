import {
  FAILURE, PENDING, START, SUCCESS,
} from 'application/state/stateConstants';
import { defineAction } from 'redux-define';

export const FETCH = defineAction(
  'FETCH',
  [START, PENDING, SUCCESS, FAILURE],
  defineAction('query/geoSuggestions'),
);

export default FETCH;
