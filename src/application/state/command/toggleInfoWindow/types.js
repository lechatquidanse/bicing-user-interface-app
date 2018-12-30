import {
  START,
} from 'application/state/stateConstants';
import { defineAction } from 'redux-define';

export const TOGGLE = defineAction(
  'TOGGLE',
  [START],
  defineAction('command/toggleInfoWindow'),
);

export default TOGGLE;
