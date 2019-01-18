import * as actions from 'application/state/query/stationAvailabilities/actions';
import operation from 'application/state/query/stationAvailabilities/operations';
import reducer from 'application/state/query/stationAvailabilities/reducers';
import * as selectors from 'application/state/query/stationAvailabilities/selectors';
import * as types from 'application/state/query/stationAvailabilities/types';

export {
  actions,
  operation,
  selectors,
  types,
};

export default reducer;
