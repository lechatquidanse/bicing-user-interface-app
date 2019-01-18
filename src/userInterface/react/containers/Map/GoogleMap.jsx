import { selectors as commandStoreItineraryGeoLocationSelectors } from 'application/state/command/storeItineraryGeoLocation';
import { selectors as commandStoreItineraryStepActiveSelectors } from 'application/state/command/storeItineraryStepActive';
import { actions as commandToggleInfoWindowActions } from 'application/state/command/toggleInfoWindow';
import React from 'react';
import { withGoogleMap, withScriptjs } from 'react-google-maps';
import { connect } from 'react-redux';
import {
  branch, compose, renderComponent, withProps,
} from 'recompose';
import { bindActionCreators } from 'redux';
import { GoogleMap as GoogleMapTemplate, MapError } from 'userInterface/react/components/Map';

const mapStateToProps = (state) => {
  const itineraryStep = commandStoreItineraryStepActiveSelectors.itineraryStep(state);

  return {
    latitude: commandStoreItineraryGeoLocationSelectors
      .latitudeByItineraryStep(itineraryStep)(state),
    longitude: commandStoreItineraryGeoLocationSelectors
      .longitudeByItineraryStep(itineraryStep)(state),
    zoom: commandStoreItineraryGeoLocationSelectors.zoomByItineraryStep(itineraryStep)(state),
    error: commandStoreItineraryGeoLocationSelectors.errorByItineraryStep(itineraryStep)(state),
    isError: commandStoreItineraryGeoLocationSelectors.isErrorByItineraryStep(itineraryStep)(state),
  };
};
const mapDispatchToProps = dispatch => bindActionCreators({
  onMapClick: () => commandToggleInfoWindowActions.toggle(null),
}, dispatch);

const withReduxConnect = connect(mapStateToProps, mapDispatchToProps);

const withMapProps = withProps({
  googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
  loadingElement: <div data-testid="map-loadingElement" style={{ height: '100%' }} />,
  containerElement: <div data-testid="map-containerElement" style={{ height: '400px' }} />,
  mapElement: <div data-testid="map-mapElement" style={{ height: '100%' }} />,
});

const isError = props => props.isError;

const GoogleMap = compose(
  withReduxConnect,
  branch(isError, renderComponent(MapError)),
  withMapProps,
  withScriptjs,
  withGoogleMap,
)(GoogleMapTemplate);

export default GoogleMap;
