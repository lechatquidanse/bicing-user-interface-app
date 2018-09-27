import { defineAction } from 'redux-define';

import { START, PENDING, CANCELLED, SUCCESS, FAILURE } from './../../stateConstants';

const domain = defineAction('lastAvailabilities');

export const FETCH_LIST = defineAction(
    'FETCH_LIST',
    [START, PENDING, CANCELLED, SUCCESS, FAILURE],
    domain
);
