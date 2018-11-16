import produce from 'immer';

import reducer from 'application/state/query/station/reducers';
import * as Types from 'application/state/query/station/types';

const INITIAL_STATE = { error: null, data: null, payload: { isFetching: false } };

describe('application/state/query/station/reducers', () => {
    it('should have initial state', () => {
        expect(reducer()).toEqual(INITIAL_STATE);
    });

    it('should not affect state for an unknow action type', () => {
        expect(reducer(INITIAL_STATE, { type: 'NOT_EXISTING' })).toEqual(INITIAL_STATE);
    });

    it('should affect state for action with type defining a fetch start', () => {
        const stationId = 'f7fa1d7b-4a7b-410d-bae0-549d862a2523';
        const expectedState = produce(INITIAL_STATE, draft => {
            draft.payload = { stationId, isFetching: true };
        });
        expect(reducer(INITIAL_STATE, { type: Types.FETCH.START, payload: { stationId, isFetching: true } })).toEqual(expectedState);
    });

    it('should affect state for action with type defining a fetch success', () => {
        const expectedState = produce(INITIAL_STATE, draft => { draft.data = { name: 'station 1' } });

        expect(reducer(INITIAL_STATE, {
            type: Types.FETCH.SUCCESS,
            payload: {
                data: { name: 'station 1' },
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
