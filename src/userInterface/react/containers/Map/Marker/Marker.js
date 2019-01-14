import { actions as commandToggleInfoWindowActions } from 'application/state/command/toggleInfoWindow';
import { selectors as queryAvailabilitiesSelectors } from 'application/state/query/availabilities';
import { selectors as queryStationsSelectors } from 'application/state/query/stations';
import { connect } from 'react-redux';
import { branch, compose, renderNothing } from 'recompose';
import { bindActionCreators } from 'redux';
import { Marker as MarkerTemplate } from 'userInterface/react/components/Map/Marker';

const mapStateToProps = (state, props) => ({
  latitude: queryStationsSelectors.latitudeByItineraryStepAndStationId(
    props.itineraryStep,
    props.stationId,
  )(state),
  longitude: queryStationsSelectors.longitudeByItineraryStepAndStationId(
    props.itineraryStep,
    props.stationId,
  )(state),
  type: queryStationsSelectors.typeByItineraryStepAndStationId(
    props.itineraryStep,
    props.stationId,
  )(state),
  status: queryAvailabilitiesSelectors.statusByItineraryStepAndStationId(
    props.itineraryStep,
    props.stationId,
  )(state),
  availableBikeNumber: queryAvailabilitiesSelectors.availableBikeNumberByItineraryStepAndStationId(
    props.itineraryStep,
    props.stationId,
  )(state),
  availableSlotNumber: queryAvailabilitiesSelectors.availableSlotNumberByItineraryStepAndStationId(
    props.itineraryStep,
    props.stationId,
  )(state),
});

const mapDispatchToProps = (dispatch, props) => bindActionCreators({
  onMarkerClick: () => commandToggleInfoWindowActions.toggle(props.stationId),
}, dispatch);

const withReduxConnect = connect(mapStateToProps, mapDispatchToProps);

const isNullMarker = props => !props.latitude || !props.longitude;

const Marker = compose(
  withReduxConnect,
  branch(isNullMarker, renderNothing),
)(MarkerTemplate);

export default Marker;
