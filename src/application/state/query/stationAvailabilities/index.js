import reducer from 'application/state/query/stationAvailabilities/reducers';
import operation from 'application/state/query/stationAvailabilities/operations';
import * as actions from 'application/state/query/stationAvailabilities/actions';
import * as Types from 'application/state/query/stationAvailabilities/types';
import * as selectors from 'application/state/query/stationAvailabilities/selectors';

export {
    actions,
    Types,
    operation,
    selectors
};

export default reducer;
