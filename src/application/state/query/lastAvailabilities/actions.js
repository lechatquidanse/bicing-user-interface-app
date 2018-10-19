import * as Types from 'application/state/query/lastAvailabilities/types';

export const fetchListStart = () => ({ type: Types.FETCH_LIST.START, payload: {} });
export const fetchListPending = () => ({ type: Types.FETCH_LIST.PENDING, payload: {} });
export const fetchListCancelled = () => ({ type: Types.FETCH_LIST.CANCELLED, payload: {} });
export const fetchListSuccess = data => ({
    type: Types.FETCH_LIST.SUCCESS,
    payload: {
        data
    },
});
export const fetchListFailure = error => ({
    type: Types.FETCH_LIST.FAILURE,
    payload: {
        error,
    },
});
