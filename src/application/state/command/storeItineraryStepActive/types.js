import { START } from 'application/state/stateConstants';
import { defineAction } from 'redux-define';

export const STORE = defineAction(
  'STORE',
  [START],
  defineAction('command/storeItineraryStepActive'),
);

export default STORE;
