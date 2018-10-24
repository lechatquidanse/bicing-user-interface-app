import produce from 'immer';

import reducer from 'application/state/query/lastAvailabilities/reducers';
import * as Types from 'application/state/query/lastAvailabilities/types';

const INITIAL_STATE = { error: false, lastAvailabilities: [] };

describe('application/state/query/lastAvailabilities/reducers', () => {
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
            draft.lastAvailabilities = [
                'last availability 1', 'last availability 2'
            ];
        });

        expect(reducer(INITIAL_STATE, {
            type: Types.FETCH_LIST.SUCCESS,
            payload: {
                data: ['last availability 1', 'last availability 2']
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
