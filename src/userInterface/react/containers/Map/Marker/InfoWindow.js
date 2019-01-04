import {
  actions as commandToggleInfoWindowActions,
  selectors as commandToggleInfoWindowSelectors,
} from 'application/state/command/toggleInfoWindow';
import { actions as flowStationAction } from 'application/state/flow/station';
import { selectors as queryAvailabilitiesSelectors } from 'application/state/query/availabilities';
import { selectors as queryStationsSelectors } from 'application/state/query/stations';
import { connect } from 'react-redux';
import { branch, compose, renderNothing } from 'recompose';
import { bindActionCreators } from 'redux';
import { InfoWindow as InfoWindowTemplate } from 'userInterface/react/components/Map/Marker';

const mapStateToProps = (state, props) => ({
  stationId: props.stationId,
  activeInfoWindowKey: commandToggleInfoWindowSelectors.key(state),
  station: queryStationsSelectors.stationById(state, props.stationId),
  latitude: queryStationsSelectors.latitudeByStationId(state, props.stationId),
  longitude: queryStationsSelectors.longitudeByStationId(state, props.stationId),
  type: queryStationsSelectors.typeByStationId(state, props.stationId),
  name: queryStationsSelectors.nameByStationId(state, props.stationId),
  zipCode: queryStationsSelectors.zipCodeByStationId(state, props.stationId),
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
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatchFlowAction: stationId => flowStationAction.flow(stationId),
  dispatchToggleInfoWindow: stationId => commandToggleInfoWindowActions.toggle(stationId),
}, dispatch);

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => ({
  ...propsFromState,
  ...propsFromDispatch,
  ...ownProps,
  onInfoWindowViewMoreClick: () => propsFromDispatch.dispatchFlowAction(propsFromState.stationId),
  onInfoWindowCloseClick: () => propsFromDispatch.dispatchToggleInfoWindow(
    propsFromState.stationId,
  ),
});

const withReduxConnect = connect(mapStateToProps, mapDispatchToProps, mergeProps);

const isDisabled = props => props.activeInfoWindowKey !== props.stationId;

const InfoWindow = compose(
  withReduxConnect,
  branch(isDisabled, renderNothing),
)(InfoWindowTemplate);

export default InfoWindow;
