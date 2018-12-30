import * as actions from 'application/state/command/configureMap/actions';
import operation from 'application/state/command/configureMap/operations';
import reducer from 'application/state/command/configureMap/reducers';
import * as types from 'application/state/command/configureMap/types';
import * as selectors from 'application/state/command/configureMap/selectors';

export {
  actions,
  operation,
  selectors,
  types,
};

export default reducer;
