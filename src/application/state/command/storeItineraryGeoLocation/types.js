import { FAILURE, START, SUCCESS } from 'application/state/stateConstants';
import { defineAction } from 'redux-define';

export const STORE = defineAction(
  'STORE',
  [START, SUCCESS, FAILURE],
  defineAction('command/storeItineraryGeoLocation'),
);

export default STORE;
