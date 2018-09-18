import * as types from "./types";

export const fetchStationListRequested = () => ({
    type: types.FETCH_STATION_LIST_REQUESTED,
    payload: {
        stations: [],
    }
});

export const fetchStationListReceived = stations => ({
    type: types.FETCH_STATION_LIST_RECEIVED,
    payload: {
        stations,
        receivedAt: Date.now(),
    },
});
