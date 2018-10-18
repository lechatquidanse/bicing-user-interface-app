import { defineAction } from 'redux-define';

import { START, PENDING, CANCELLED, SUCCESS, FAILURE } from 'application/state/stateConstants';

const domain = defineAction('map');

export const FETCH_MAP = defineAction(
    'FETCH_MAP',
    [START, PENDING, CANCELLED, SUCCESS, FAILURE],
    domain
);
