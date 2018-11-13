import { defineAction } from 'redux-define';

import { START, PENDING, CANCELLED, SUCCESS, FAILURE } from 'application/state/stateConstants';

const domain = defineAction('stationAvailabilities');

export const FETCH = defineAction(
    'FETCH',
    [START, PENDING, CANCELLED, SUCCESS, FAILURE],
    domain
);
