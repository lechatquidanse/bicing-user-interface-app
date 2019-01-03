import { actions, selectors } from 'application/state/query/stationAvailabilities';
import { connect } from 'react-redux';
import {
  branch, compose, renderComponent, renderNothing,
} from 'recompose';
import { bindActionCreators } from 'redux';
import {
  Empty as EmptyTemplate,
  Loading as LoadingTemplate,
  StationAvailabilities as StationAvailabilitiesTemplate,
} from 'userInterface/react/components/Station/StationAvailabilities';

const isLoadingStationAvailabilities = props => props.isFetchingStationAvailabilities;
const isNullStationAvailabilities = props => !props.stationAvailabilities;
const isEmptyStationAvailabilities = props => Object.keys(props.stationAvailabilities).length === 0;

const mapStateToProps = state => ({
  stationId: selectors.stationId(state),
  stationAvailabilities: selectors.stationAvailabilitiesSorted(state),
  isFetchingStationAvailabilities: selectors.isFetching(state),
  dateStart: selectors.periodStart(state),
  dateEnd: selectors.periodEnd(state),
  interval: selectors.interval(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    dispatchChange: (stationId, periodStart, periodEnd, interval) => actions.fetchStart(
      stationId,
      periodStart,
      periodEnd,
      interval,
    ),
  }, dispatch,
);

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => ({
  ...propsFromState,
  ...propsFromDispatch,
  ...ownProps,
  onDateStartChange: date => propsFromDispatch.dispatchChange(
    propsFromState.stationId,
    date,
    propsFromState.dateEnd,
    propsFromState.interval,
  ),
  onDateEndChange: date => propsFromDispatch.dispatchChange(
    propsFromState.stationId,
    propsFromState.dateStart,
    date,
    propsFromState.interval,
  ),
  onIntervalChange: interval => propsFromDispatch.dispatchChange(
    propsFromState.stationId,
    propsFromState.dateStart,
    propsFromState.dateEnd,
    interval,
  ),
});

const withReduxConnect = connect(mapStateToProps, mapDispatchToProps, mergeProps);

const StationAvailabilities = compose(
  withReduxConnect,
  branch(isLoadingStationAvailabilities, renderComponent(LoadingTemplate)),
  branch(isNullStationAvailabilities, renderNothing),
  branch(isEmptyStationAvailabilities, renderComponent(EmptyTemplate)),
)(StationAvailabilitiesTemplate);

export default StationAvailabilities;
