import { selectors } from 'application/state/query/station';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {
  Loading as LoadingTemplate,
  StationDetails as StationDetailsTemplate,
} from 'userInterface/react/components/StationDetails';
import { withEither, withMaybe } from 'userInterface/react/renderers';

const isNullStation = props => !props.station;
const isLoadingStationDetails = props => props.isFetching;

const mapStateToProps = state => ({
  station: selectors.data(state),
  isFetching: selectors.isFetching(state),
});

const withReduxConnect = connect(mapStateToProps);

const StationDetails = compose(
  withReduxConnect,
  withEither(isLoadingStationDetails, LoadingTemplate),
  withMaybe(isNullStation),
)(StationDetailsTemplate);

export default StationDetails;
