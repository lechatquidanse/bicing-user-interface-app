import {
  CANCELLED, FAILURE, START, SUCCESS,
} from 'application/state/stateConstants';
import { defineAction } from 'redux-define';

export const DISPLAY = defineAction(
  'DISPLAY',
  [START, CANCELLED, SUCCESS, FAILURE],
  defineAction('command/map'),
);

export default DISPLAY;
