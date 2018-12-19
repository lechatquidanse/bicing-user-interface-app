import * as commandReducers from 'application/state/command';
import * as flowReducers from 'application/state/flow';
import { operation as flowMapOperation } from 'application/state/flow/map';
import { operation as flowStationOperation } from 'application/state/flow/station';
import * as queryReducers from 'application/state/query';
import { operation as commandMapOperation } from 'application/state/command/map';
import { operation as queryLastAvailabilitiesOperation } from 'application/state/query/lastAvailabilities';
import { operation as queryStationOperation } from 'application/state/query/station';
import { operation as queryStationAvailabilitiesOperation } from 'application/state/query/stationAvailabilities';
import { operation as queryStationsOperation } from 'application/state/query/stations';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
  command: combineReducers(commandReducers),
  flow: combineReducers(flowReducers),
  query: combineReducers(queryReducers),
});

export default createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(commandMapOperation);
sagaMiddleware.run(flowMapOperation);
sagaMiddleware.run(flowStationOperation);
sagaMiddleware.run(queryLastAvailabilitiesOperation);
sagaMiddleware.run(queryStationAvailabilitiesOperation);
sagaMiddleware.run(queryStationOperation);
sagaMiddleware.run(queryStationsOperation);
