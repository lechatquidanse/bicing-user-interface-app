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

    it('should not affect state for an unknow action type', () => {
        const expectedState = produce(INITIAL_STATE, draft => {
            draft.payload = {};
        });
        expect(reducer(INITIAL_STATE, { type: Types.FETCH_LIST.START, payload: {} })).toEqual(expectedState);
    });
})
