import * as commandReducers from 'application/state/command';
import { operation as commandToggleInfoWindowOperation } from 'application/state/command/toggleInfoWindow';
import { operation as commandConfigureMapOperation } from 'application/state/command/configureMap';
import * as flowReducers from 'application/state/flow';
import { operation as flowMapOperation } from 'application/state/flow/map';
import { operation as flowStationOperation } from 'application/state/flow/station';
import * as queryReducers from 'application/state/query';
import { operation as queryAvailabilitiesOperation } from 'application/state/query/availabilities';
import { operation as queryStationOperation } from 'application/state/query/station';
import { operation as queryStationAvailabilitiesOperation } from 'application/state/query/stationAvailabilities';
import { operation as queryStationsOperation } from 'application/state/query/stations';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { operation as queryReverseGeoCodeOperation } from 'application/state/query/reverseGeoCode';

const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
  command: combineReducers(commandReducers),
  flow: combineReducers(flowReducers),
  query: combineReducers(queryReducers),
});

export default createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(commandToggleInfoWindowOperation);
sagaMiddleware.run(commandConfigureMapOperation);
sagaMiddleware.run(flowMapOperation);
sagaMiddleware.run(flowStationOperation);
sagaMiddleware.run(queryAvailabilitiesOperation);
sagaMiddleware.run(queryReverseGeoCodeOperation);
sagaMiddleware.run(queryStationAvailabilitiesOperation);
sagaMiddleware.run(queryStationOperation);
sagaMiddleware.run(queryStationsOperation);
