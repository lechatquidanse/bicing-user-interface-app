import { selectors } from 'application/state/query/station';
import { connect } from 'react-redux';
import {
  branch, compose, renderComponent, renderNothing,
} from 'recompose';
import {
  Loading as LoadingTemplate,
  StationDetails as StationDetailsTemplate,
} from 'userInterface/react/components/StationDetails';

const isNullStation = props => !props.station;
const isFetching = props => props.isFetching;

const mapStateToProps = state => ({
  station: selectors.data(state),
  name: selectors.name(state),
  type: selectors.type(state),
  address: selectors.address(state),
  addressNumber: selectors.addressNumber(state),
  zipCode: selectors.zipCode(state),
  isFetching: selectors.isFetching(state),
});

const withReduxConnect = connect(mapStateToProps);

const StationDetails = compose(
  withReduxConnect,
  branch(isFetching, renderComponent(LoadingTemplate)),
  branch(isNullStation, renderNothing),
)(StationDetailsTemplate);

export default StationDetails;
