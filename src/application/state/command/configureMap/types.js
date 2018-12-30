import {
  FAILURE, START, SUCCESS,
} from 'application/state/stateConstants';
import { defineAction } from 'redux-define';

export const CONFIGURE = defineAction(
  'CONFIGURE',
  [START, SUCCESS, FAILURE],
  defineAction('command/configureMap'),
);

export default CONFIGURE;
