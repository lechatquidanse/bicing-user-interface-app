import * as commandReducers from 'application/state/command';
import { operation as commandEnableGeoLocation } from 'application/state/command/enableGeoLocation';
import { operation as commandStoreItineraryAtOperation } from 'application/state/command/storeItineraryAt';
import { operation as commandStoreItineraryGeoLocationOperation } from 'application/state/command/storeItineraryGeoLocation';
import { operation as commandStoreItineraryStepActiveOperation } from 'application/state/command/storeItineraryStepActive';
import { operation as commandToggleInfoWindowOperation } from 'application/state/command/toggleInfoWindow';
import * as flowReducers from 'application/state/flow';
import { operation as flowMapOperation } from 'application/state/flow/map';
import { operation as flowStationOperation } from 'application/state/flow/station';
import * as queryReducers from 'application/state/query';
import { operation as queryAvailabilitiesOperation } from 'application/state/query/availabilities';
import { operation as queryGeoSuggestionsOperation } from 'application/state/query/geoSuggestions';
import { operation as queryReverseGeoCodeOperation } from 'application/state/query/reverseGeoCode';
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

export default createStore(rootReducer, {}, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(commandEnableGeoLocation);
sagaMiddleware.run(commandStoreItineraryAtOperation);
sagaMiddleware.run(commandStoreItineraryGeoLocationOperation);
sagaMiddleware.run(commandStoreItineraryStepActiveOperation);
sagaMiddleware.run(commandToggleInfoWindowOperation);
sagaMiddleware.run(flowMapOperation);
sagaMiddleware.run(flowStationOperation);
sagaMiddleware.run(queryAvailabilitiesOperation);
sagaMiddleware.run(queryGeoSuggestionsOperation);
sagaMiddleware.run(queryReverseGeoCodeOperation);
sagaMiddleware.run(queryStationAvailabilitiesOperation);
sagaMiddleware.run(queryStationOperation);
sagaMiddleware.run(queryStationsOperation);
