import {
  actions as commandToggleInfoWindowActions,
  selectors as commandToggleInfoWindowSelectors,
} from 'application/state/command/toggleInfoWindow';
import { selectors as queryAvailabilitiesSelectors } from 'application/state/query/availabilities';
import { actions as queryStationAction } from 'application/state/query/station';
import { actions as queryStationAvailabilitiesActions } from 'application/state/query/stationAvailabilities';
import { selectors as queryStationsSelectors } from 'application/state/query/stations';
import { connect } from 'react-redux';
import { branch, compose, renderNothing } from 'recompose';
import { bindActionCreators } from 'redux';
import { InfoWindow as InfoWindowTemplate } from 'userInterface/react/components/Map/Marker';

const mapStateToProps = (state, props) => ({
  activeInfoWindowKey: commandToggleInfoWindowSelectors.key(state),
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
  name: queryStationsSelectors.nameByItineraryStepAndStationId(
    props.itineraryStep,
    props.stationId,
  )(state),
  zipCode: queryStationsSelectors.zipCodeByItineraryStepAndStationId(
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

const mapDispatchToProps = dispatch => bindActionCreators({
  queryStationAction: stationId => queryStationAction.fetchStart(stationId),
  queryStationAvailabilities: stationId => queryStationAvailabilitiesActions.fetchStart(stationId),
  toggleInfoWindow: stationId => commandToggleInfoWindowActions.toggle(stationId),
}, dispatch);

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => ({
  ...propsFromState,
  ...propsFromDispatch,
  ...ownProps,
  onInfoWindowViewMoreClick: () => propsFromDispatch.queryStationAction(ownProps.stationId),
  onInfoWindowCloseClick: () => propsFromDispatch.toggleInfoWindow(ownProps.stationId),
});

const withReduxConnect = connect(mapStateToProps, mapDispatchToProps, mergeProps);

const isDisabled = props => props.activeInfoWindowKey !== props.stationId;

const InfoWindow = compose(
  withReduxConnect,
  branch(isDisabled, renderNothing),
)(InfoWindowTemplate);

export default InfoWindow;
