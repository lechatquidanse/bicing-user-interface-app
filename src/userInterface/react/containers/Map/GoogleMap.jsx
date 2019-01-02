import { selectors as commandConfigureMapSelectors } from 'application/state/command/configureMap';
import { actions as commandToggleInfoWindowActions } from 'application/state/command/toggleInfoWindow';
import React from 'react';
import { withGoogleMap } from 'react-google-maps';
import { connect } from 'react-redux';
import {
  branch, compose, renderComponent, withProps,
} from 'recompose';
import { bindActionCreators } from 'redux';
import { GoogleMap as GoogleMapTemplate, MapError } from 'userInterface/react/components/Map';

const mapStateToProps = state => ({
  latitude: commandConfigureMapSelectors.latitude(state),
  longitude: commandConfigureMapSelectors.longitude(state),
  zoom: commandConfigureMapSelectors.zoom(state),
  error: commandConfigureMapSelectors.error(state),
  data: commandConfigureMapSelectors.data(state),
});
const mapDispatchToProps = dispatch => bindActionCreators({
  onMapClick: () => commandToggleInfoWindowActions.toggle(null),
}, dispatch);

const withReduxConnect = connect(mapStateToProps, mapDispatchToProps);
const withMapProps = withProps({
  containerElement: <div style={{ height: '400px' }} />,
  mapElement: <div style={{ height: '100%' }} />,
});

const isError = props => props.error;

const GoogleMap = compose(
  withMapProps,
  withGoogleMap,
  withReduxConnect,
  branch(isError, renderComponent(MapError)),
)(GoogleMapTemplate);

export default GoogleMap;
