import { START } from 'application/state/stateConstants';
import { defineAction } from 'redux-define';

export const FLOW = defineAction(
  'FLOW',
  [START],
  defineAction('flow/station'),
);

export default FLOW;
