import {
  START,
} from 'application/state/stateConstants';
import { defineAction } from 'redux-define';

export const FLOW = defineAction(
  'FLOW',
  [START],
  defineAction('flow/map'),
);

export default FLOW;
