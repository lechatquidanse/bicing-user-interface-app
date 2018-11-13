import produce from 'immer';

import reducer from 'application/state/query/stationAvailabilities/reducers';
import * as Types from 'application/state/query/stationAvailabilities/types';

const INITIAL_STATE = { error: false, stationAvailabilities: [] };

describe('application/state/query/stationAvailabilities/reducers', () => {
    it('should have initial state', () => {
        expect(reducer()).toEqual(INITIAL_STATE);
    });

    it('should not affect state for an unknow action type', () => {
        expect(reducer(INITIAL_STATE, { type: 'NOT_EXISTING' })).toEqual(INITIAL_STATE);
    });

    it('should affect state for action with type defining a fetch start', () => {
        const expectedState = produce(INITIAL_STATE, draft => {
            draft.payload = {};
        });
        expect(reducer(INITIAL_STATE, { type: Types.FETCH.START, payload: {} })).toEqual(expectedState);
    });

    it('should affect state for action with type defining a fetch success', () => {
        const expectedState = produce(INITIAL_STATE, draft => {
            draft.stationAvailabilities = [
                'stationAvailabilities 1', 'stationAvailabilities 2'
            ];
        });

        expect(reducer(INITIAL_STATE, {
            type: Types.FETCH.SUCCESS,
            payload: {
                data: ['stationAvailabilities 1', 'stationAvailabilities 2']
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
                error: 'An error occured during fetch.'
            }
        })).toEqual(expectedState);
    });
})
