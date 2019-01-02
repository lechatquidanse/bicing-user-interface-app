import {
  actions as commandToggleInfoWindowActions,
  selectors as commandToggleInfoWindowSelectors,
} from 'application/state/command/toggleInfoWindow';
import { selectors as queryLastAvailabilitiesSelectors } from 'application/state/query/lastAvailabilities';
import { actions as queryStationActions } from 'application/state/query/station';
import { selectors as queryStationsSelectors } from 'application/state/query/stations';
import { connect } from 'react-redux';
import { branch, compose, renderNothing } from 'recompose';
import { bindActionCreators } from 'redux';
import { InfoWindow as InfoWindowTemplate } from 'userInterface/react/components/Map/Marker';

// @todo add error if no latitude and longitude etc... and wait for lastAvailabilitiy to be ready
const mapStateToProps = (state, props) => ({
  activeInfoWindowKey: commandToggleInfoWindowSelectors.key(state),
  station: queryStationsSelectors.stationById(state, props.stationId),
  latitude: queryStationsSelectors.latitudeByStationId(state, props.stationId),
  longitude: queryStationsSelectors.longitudeByStationId(state, props.stationId),
  type: queryStationsSelectors.typeByStationId(state, props.stationId),
  name: queryStationsSelectors.nameByStationId(state, props.stationId),
  zipCode: queryStationsSelectors.zipCodeByStationId(state, props.stationId),
  lastAvailability: queryLastAvailabilitiesSelectors.lastAvailabilityById(state, props.stationId),
  status: queryLastAvailabilitiesSelectors.statusByStationId(state, props.stationId),
  availableBikeNumber: queryLastAvailabilitiesSelectors.availableBikeNumberByStationId(
    state,
    props.stationId,
  ),
  availableSlotNumber: queryLastAvailabilitiesSelectors.availableSlotNumberByStationId(
    state,
    props.stationId,
  ),
});

// @todo add call queryStationAvailabilitiesActions.fetchStart(props.stationId)
const mapDispatchToProps = (dispatch, props) => bindActionCreators({
  onInfoWindowViewMoreClick: () => queryStationActions.fetchStart(props.stationId),
  onInfoWindowCloseClick: () => commandToggleInfoWindowActions.toggle(props.stationId),
}, dispatch);

const withReduxConnect = connect(mapStateToProps, mapDispatchToProps);

const isDisabled = props => props.activeInfoWindowKey !== props.stationId;

const InfoWindow = compose(
  withReduxConnect,
  branch(isDisabled, renderNothing),
)(InfoWindowTemplate);

export default InfoWindow;
