import produce from 'immer';

import reducer from 'application/state/query/stations/reducers';
import * as Types from 'application/state/query/stations/types';

const INITIAL_STATE = { error: false, stations: [] };

describe('application/state/query/stations/reducers', () => {
    it('should have initial state', () => {
        expect(reducer()).toEqual(INITIAL_STATE);
    });

    it('should not affect state for an unknow action type', () => {
        expect(reducer(INITIAL_STATE, { type: 'NOT_EXISTING' })).toEqual(INITIAL_STATE);
    });

    it('should affect state for action with type defining a fetch list start', () => {
        const expectedState = produce(INITIAL_STATE, draft => {
            draft.payload = {};
        });
        expect(reducer(INITIAL_STATE, { type: Types.FETCH_LIST.START, payload: {} })).toEqual(expectedState);
    });

    it('should affect state for action with type defining a fetch list success', () => {
        const expectedState = produce(INITIAL_STATE, draft => {
            draft.stations = [
                'station 1', 'station 2'
            ];
        });

        expect(reducer(INITIAL_STATE, {
            type: Types.FETCH_LIST.SUCCESS,
            payload: {
                data: ['station 1', 'station 2']
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
                error: 'An error occured during fetch list.'
            }
        })).toEqual(expectedState);
    });
})
