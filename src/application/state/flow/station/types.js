import { defineAction } from 'redux-define';

import { START, PENDING, CANCELLED, SUCCESS, FAILURE } from 'application/state/stateConstants';

const domain = defineAction('station');

export const FETCH_STATION = defineAction(
    'FETCH_STATION',
    [START, PENDING, CANCELLED, SUCCESS, FAILURE],
    domain
);
