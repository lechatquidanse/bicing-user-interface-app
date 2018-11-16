import produce from 'immer';

import reducer from 'application/state/query/stations/reducers';
import * as Types from 'application/state/query/stations/types';

const INITIAL_STATE = { error: null, data: null, payload: { isFetching: false } };

describe('application/state/query/stations/reducers', () => {
    it('should have initial state', () => {
        expect(reducer()).toEqual(INITIAL_STATE);
    });

    it('should not affect state for an unknow action type', () => {
        expect(reducer(INITIAL_STATE, { type: 'NOT_EXISTING' })).toEqual(INITIAL_STATE);
    });

    it('should affect state for action with type defining a fetch list start', () => {
        const expectedState = produce(INITIAL_STATE, draft => {
            draft.payload = { isFetching: true };
        });
        expect(reducer(INITIAL_STATE, { type: Types.FETCH_LIST.START, payload: { isFetching: true } })).toEqual(expectedState);
    });

    it('should affect state for action with type defining a fetch list success', () => {
        const expectedState = produce(INITIAL_STATE, draft => {
            draft.data = [
                'station 1', 'station 2'
            ];
        });

        expect(reducer(INITIAL_STATE, {
            type: Types.FETCH_LIST.SUCCESS,
            payload: {
                data: ['station 1', 'station 2'],
                isFetching: false
            }
        })).toEqual(expectedState);
    });

    it('should affect state for action with type defining a fetch list failure', () => {
        const expectedState = produce(INITIAL_STATE, draft => {
            draft.error = 'An error occured during fetch list.';
        });
        expect(reducer(INITIAL_STATE, {
            type: Types.FETCH_LIST.FAILURE,
            payload: {
                error: 'An error occured during fetch list.',
                isFetching: false
            }
        })).toEqual(expectedState);
    });
})
