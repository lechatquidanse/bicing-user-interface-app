import reducer from 'application/state/query/lastAvailabilities/reducers';
import operation from 'application/state/query/lastAvailabilities/operations';
import * as actions from 'application/state/query/lastAvailabilities/actions';
import * as Types from 'application/state/query/lastAvailabilities/types';
import * as selectors from 'application/state/query/lastAvailabilities/selectors';

export {
    actions,
    Types,
    operation,
    selectors
};

export default reducer;
