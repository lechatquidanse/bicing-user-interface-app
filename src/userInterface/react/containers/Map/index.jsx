import { actions as flowMapActions, selectors } from 'application/state/flow/map';
import { actions as flowStationActions } from 'application/state/flow/station';
import React from 'react';
import { withGoogleMap, withScriptjs } from 'react-google-maps';
import { connect } from 'react-redux';
import {
  compose, lifecycle, withProps, withStateHandlers,
} from 'recompose';
import { bindActionCreators } from 'redux';
import {
  Empty as EmptyTemplate,
  Loading as LoadingTemplate,
  Map as MapTemplate,
} from 'userInterface/react/components/Map';
import { withEither, withMaybe } from 'userInterface/react/renderers';

const isLoadingStations = props => props.isFetchingStations;
const isNullStations = props => !props.stations;
const isEmptyStations = props => props.stations.length === 0;

const withMapProps = withProps({
  googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
  loadingElement: <div style={{ height: '100%' }} />,
  containerElement: <div style={{ height: '400px' }} />,
  mapElement: <div style={{ height: '100%' }} />,
});

const mapStateToProps = state => ({
  mapDisplayConfiguration: selectors.displayConfiguration(state),
  stations: selectors.stationsWithLastAvailability(state),
  isFetchingStations: selectors.isFetching(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  flowMapStart: flowMapActions.flowStart,
  onInfoWindowViewMoreClick: flowStationActions.flowStart,
}, dispatch);

const withReduxConnect = connect(mapStateToProps, mapDispatchToProps);

const withLifeCycle = lifecycle({
  componentDidMount() {
    this.props.flowMapStart();
  },
});

const withMarkerClickBehaviour = withStateHandlers(
  { markerActive: null },
  {
    onMapClick: () => () => ({ markerActive: null }),
    onMarkerClick: () => markerId => ({ markerActive: markerId }),
    onInfoWindowCloseClick: () => () => ({ markerActive: null }),
  },
);

const Map = compose(
  withMapProps,
  withScriptjs,
  withGoogleMap,
  withReduxConnect,
  withLifeCycle,
  withMarkerClickBehaviour,
  withEither(isLoadingStations, LoadingTemplate),
  withMaybe(isNullStations),
  withEither(isEmptyStations, EmptyTemplate),
)(MapTemplate);

export default Map;
