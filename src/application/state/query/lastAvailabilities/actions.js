import * as Types from 'application/state/query/lastAvailabilities/types';

export const fetchListStart = () => ({
    type: Types.FETCH_LIST.START,
    payload: {
        isFetching: true
    }
});

export const fetchListSuccess = data => ({
    type: Types.FETCH_LIST.SUCCESS,
    payload: {
        data,
        isFetching: false
    },
});
