import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import * as queryReducers from './query';
import * as flowReducers from './flow';
import stationsOperation from './query/stations/operations';
import lastAvailabilitiesOperation from './query/lastAvailabilities/operations';
import map from './flow/map/operations';

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
sagaMiddleware.run(lastAvailabilitiesOperation);
sagaMiddleware.run(map);
