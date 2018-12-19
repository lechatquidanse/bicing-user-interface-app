import { actions, selectors as queryStationAvailabilitiesSelectors } from 'application/state/query/stationAvailabilities';
import { connect } from 'react-redux';
import { compose, withStateHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
import {
  Empty as EmptyTemplate,
  Loading as LoadingTemplate,
  StationAvailabilities as StationAvailabilitiesTemplate,
} from 'userInterface/react/components/StationAvailabilities';
import { withEither, withMaybe } from 'userInterface/react/renderers';

const isLoadingStationAvailabilities = props => props.isFetchingStationAvailabilities;
const isNullStationAvailabilities = props => !props.stationAvailabilities;
const isNullFilter = props => !props.stationAvailabilitiesFilter;
const isEmptyStationAvailabilities = props => Object.keys(props.stationAvailabilities).length === 0;

const mapStateToProps = state => ({
  stationId: queryStationAvailabilitiesSelectors.stationId(state),
  stationAvailabilities: queryStationAvailabilitiesSelectors.stationAvailabilitiesSorted(state),
  stationAvailabilitiesFilter: queryStationAvailabilitiesSelectors.byIntervalInPeriodFilter(state),
  isFetchingStationAvailabilities: queryStationAvailabilitiesSelectors.isFetching(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onDateChange: actions.fetchStart,
  onIntervalChange: actions.fetchStart,
}, dispatch);

const withReduxConnect = connect(mapStateToProps, mapDispatchToProps);

const withOnChange = withStateHandlers(
  {
    dateStartPicked: null,
    dateEndPicked: null,
    intervalSelected: null,
  },
  {
    onDateStartPicked: () => date => ({ dateStartPicked: date }),
    onDateEndPicked: () => date => ({ dateEndPicked: date }),
    onIntervalSelected: () => selectedOption => ({ intervalSelected: selectedOption }),
  },
);

const StationAvailabilities = compose(
  withReduxConnect,
  withOnChange,
  withEither(isLoadingStationAvailabilities, LoadingTemplate),
  withMaybe(isNullStationAvailabilities),
  withMaybe(isNullFilter),
  withEither(isEmptyStationAvailabilities, EmptyTemplate),
)(StationAvailabilitiesTemplate);

export default StationAvailabilities;
