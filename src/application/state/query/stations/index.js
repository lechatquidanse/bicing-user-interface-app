import reducer from 'application/state/query/stations/reducers';
import operation from 'application/state/query/stations/operations';
import * as actions from 'application/state/query/stations/actions';
import * as Types from 'application/state/query/stations/types';
import * as selectors from 'application/state/query/stations/selectors';

export {
    actions,
    Types,
    operation,
    selectors
};

export default reducer;
