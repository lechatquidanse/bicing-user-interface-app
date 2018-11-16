import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import * as queryReducers from 'application/state/query';
import * as flowReducers from 'application/state/flow';
import stationsOperation from 'application/state/query/stations/operations';
import stationOperation from 'application/state/query/station/operations';
import stationAvailabilitiesOperation from 'application/state/query/stationAvailabilities/operations';
import lastAvailabilitiesOperation from 'application/state/query/lastAvailabilities/operations';
import map from 'application/state/flow/map/operations';
import station from 'application/state/flow/station/operations';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    query: combineReducers(queryReducers),
    flow: combineReducers(flowReducers),
});

export default createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(stationsOperation);
sagaMiddleware.run(stationOperation);
sagaMiddleware.run(stationAvailabilitiesOperation);
sagaMiddleware.run(lastAvailabilitiesOperation);
sagaMiddleware.run(map);
sagaMiddleware.run(station);
