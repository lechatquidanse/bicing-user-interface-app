import reducer from 'application/state/query/station/reducers';
import operation from 'application/state/query/station/operations';
import * as actions from 'application/state/query/station/actions';
import * as Types from 'application/state/query/station/types';
import * as selectors from 'application/state/query/station/selectors';

export {
    actions,
    Types,
    operation,
    selectors
};

export default reducer;
