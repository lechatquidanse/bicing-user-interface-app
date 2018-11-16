import { compose, withStateHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { dataSelector as StationDataSelector } from 'application/state/query/station/selectors';
import { stationAvailabilitiesSortedSelector, filterSelector, isFetchingSelector } from 'application/state/query/stationAvailabilities/selectors';
import {
    Loading as LoadingTemplate,
    Empty as EmptyTemplate,
    StationAvailabilities as StationAvailabilitiesTemplate
} from 'userInterface/react/components/StationAvailabilities';
import { fetchStart } from 'application/state/query/stationAvailabilities/actions';
import { withMaybe, withEither } from 'userInterface/react/renderers';

const isLoadingStationAvailabilities = (props) => props.isFetchingStationAvailabilities;
const isNullStationAvailabilities = (props) => !props.stationAvailabilities;
const isNullFilter = (props) => !props.stationAvailabilitiesFilter;
const isEmptyStationAvailabilities = (props) => Object.keys(props.stationAvailabilities).length === 0;

const mapStateToProps = state => ({
    station: StationDataSelector(state),
    stationAvailabilities: stationAvailabilitiesSortedSelector(state),
    stationAvailabilitiesFilter: filterSelector(state),
    isFetchingStationAvailabilities: isFetchingSelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        onDateChange: fetchStart,
        onIntervalChange: fetchStart,
    }, dispatch);

const withReduxConnect = connect(mapStateToProps, mapDispatchToProps);

const withOnChange = withStateHandlers(
    {
        dateStartPicked: null,
        dateEndPicked: null,
        intervalSelected: null
    },
    {
        onDateStartPicked: () => (date) => ({ dateStartPicked: date }),
        onDateEndPicked: () => (date) => ({ dateEndPicked: date }),
        onIntervalSelected: () => (selectedOption) => ({ intervalSelected: selectedOption })
    }
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
