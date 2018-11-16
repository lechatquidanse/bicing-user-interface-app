import produce from 'immer';

import reducer from 'application/state/query/stationAvailabilities/reducers';
import * as Types from 'application/state/query/stationAvailabilities/types';

const INITIAL_STATE = { data: null, error: null, payload: { isFetching: false } };

describe('application/state/query/stationAvailabilities/reducers', () => {
    it('should have initial state', () => {
        expect(reducer()).toEqual(INITIAL_STATE);
    });

    it('should not affect state for an unknow action type', () => {
        expect(reducer(INITIAL_STATE, { type: 'NOT_EXISTING' })).toEqual(INITIAL_STATE);
    });

    it('should affect state for action with type defining a fetch start', () => {
        const expectedState = produce(INITIAL_STATE, draft => {
            draft.payload = { isFetching: true, stationId: 'stationId' };
        });
        expect(reducer(INITIAL_STATE, { type: Types.FETCH.START, payload: { isFetching: true, stationId: 'stationId' } })).toEqual(expectedState);
    });

    it('should affect state for action with type defining a fetch success', () => {
        const expectedState = produce(INITIAL_STATE, draft => {
            draft.data = [
                'stationAvailabilities 1', 'stationAvailabilities 2'
            ];
        });

        expect(reducer(INITIAL_STATE, {
            type: Types.FETCH.SUCCESS,
            payload: {
                data: ['stationAvailabilities 1', 'stationAvailabilities 2'],
                isFetching: false
            }
        })).toEqual(expectedState);
    });

    it('should affect state for action with type defining a fetch failure', () => {
        const expectedState = produce(INITIAL_STATE, draft => {
            draft.error = 'An error occured during fetch.';
        });
        expect(reducer(INITIAL_STATE, {
            type: Types.FETCH.FAILURE,
            payload: {
                error: 'An error occured during fetch.',
                isFetching: false
            }
        })).toEqual(expectedState);
    });
})
