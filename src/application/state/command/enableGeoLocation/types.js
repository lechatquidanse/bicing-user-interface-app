import {
  START,
} from 'application/state/stateConstants';
import { defineAction } from 'redux-define';

export const ENABLE = defineAction(
  'ENABLE',
  [START],
  defineAction('command/enableGeoLocation'),
);

export default ENABLE;
