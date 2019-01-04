import { actions as commandToggleInfoWindowActions } from 'application/state/command/toggleInfoWindow';
import { selectors as queryAvailabilitiesSelectors } from 'application/state/query/availabilities';
import { selectors as queryStationsSelectors } from 'application/state/query/stations';
import { connect } from 'react-redux';
import { branch, compose, renderNothing } from 'recompose';
import { bindActionCreators } from 'redux';
import { Marker as MarkerTemplate } from 'userInterface/react/components/Map/Marker';

const isNullMarker = props => props.type === null || props.status === null;

const mapStateToProps = (state, props) => ({
  station: queryStationsSelectors.stationById(state, props.stationId),
  latitude: queryStationsSelectors.latitudeByStationId(state, props.stationId),
  longitude: queryStationsSelectors.longitudeByStationId(state, props.stationId),
  type: queryStationsSelectors.typeByStationId(state, props.stationId),
  lastAvailability: queryAvailabilitiesSelectors.lastAvailabilityById(state, props.stationId),
  status: queryAvailabilitiesSelectors.statusByStationId(state, props.stationId),
  availableBikeNumber: queryAvailabilitiesSelectors.availableBikeNumberByStationId(
    state,
    props.stationId,
  ),
  availableSlotNumber: queryAvailabilitiesSelectors.availableSlotNumberByStationId(
    state,
    props.stationId,
  ),
  isNullMarker: props.isNullMarker,
});

const mapDispatchToProps = (dispatch, props) => bindActionCreators({
  onMarkerClick: () => commandToggleInfoWindowActions.toggle(props.stationId),
}, dispatch);

const withReduxConnect = connect(mapStateToProps, mapDispatchToProps);

const Marker = compose(
  withReduxConnect,
  branch(isNullMarker, renderNothing),
)(MarkerTemplate);

export default Marker;
