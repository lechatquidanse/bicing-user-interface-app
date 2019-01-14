import { selectors as commandConfigureMapSelectors } from 'application/state/command/configureMap';
import {
  actions as commandEnableGeoLocationActions,
  selectors as commandEnableGeoLocationSelectors,
} from 'application/state/command/enableGeoLocation';
import { actions as flowMapActions } from 'application/state/flow/map';
import { selectors as queryAvailabilitiesSelectors } from 'application/state/query/availabilities';
import { selectors as queryReverseGeoCodeSelectors } from 'application/state/query/reverseGeoCode';
import React from 'react';
import { withScriptjs } from 'react-google-maps';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { bindActionCreators } from 'redux';
import { GeoSuggestion as GeoSuggestionTemplate } from 'userInterface/react/components/GeoLocation';

export const mapStateToProps = itineraryStep => (state, props) => {
  const step = props.itineraryStep === undefined ? itineraryStep : props.itineraryStep;

  const initialValue = step === commandEnableGeoLocationSelectors.itineraryStep(state)
    ? queryReverseGeoCodeSelectors.addressOrError(state) : undefined;

  // @todo add provider for suggestion
  const fixtures = [
    { label: 'Use current Location', location: 'geoLocation' },
    { label: '02 - C/ ROGER DE FLOR, 126', location: { lat: 41.39553, lng: 2.17706 } },
    { label: '35 - C/ SANT RAMON DE PENYAFORT', location: { lat: 41.413592, lng: 2.221153 } },
    {
      label: '227 - C/ DEL TORRENT DE LES FLORS, 102',
      location: { lat: 41.407837, lng: 2.158678 },
    },
  ];

  return {
    itineraryStep: step,
    itineraryAt: queryAvailabilitiesSelectors.itineraryAtByItineraryStep(step)(state),
    periodStartAt: queryAvailabilitiesSelectors.periodStartAtByItineraryStep(step)(state),
    periodEndAt: queryAvailabilitiesSelectors.periodEndAtByItineraryStep(step)(state),
    interval: queryAvailabilitiesSelectors.intervalByItineraryStep(step)(state),
    latitude: commandConfigureMapSelectors.latitude(state),
    longitude: commandConfigureMapSelectors.longitude(state),
    limit: commandConfigureMapSelectors.limit(state),
    initialValue,
    fixtures,
  };
};

export const mapDispatchToProps = dispatch => bindActionCreators({
  enableGeoLocation: itineraryStep => commandEnableGeoLocationActions.enable(itineraryStep),
  flowMap: (
    itineraryStep,
    itineraryAt,
    periodStartAt,
    periodEndAt,
    interval,
    latitude,
    longitude,
    limit,
  ) => flowMapActions.flow(
    itineraryStep,
    itineraryAt,
    periodStartAt,
    periodEndAt,
    interval,
    latitude,
    longitude,
    limit,
  ),
}, dispatch);

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => ({
  ...propsFromState,
  ...propsFromDispatch,
  ...ownProps,
  onSuggestSelect: (suggest) => {
    if (suggest === undefined) {
      return null;
    }

    if (suggest.location === 'geoLocation') {
      return propsFromDispatch.enableGeoLocation(propsFromState.itineraryStep);
    }
    return propsFromDispatch.flowMap(
      propsFromState.itineraryStep,
      propsFromState.itineraryAt,
      propsFromState.periodStartAt,
      propsFromState.periodEndAt,
      propsFromState.interval,
      suggest.location.lat,
      suggest.location.lng,
      500,
    );
  },
});

const withReduxConnect = connect(mapStateToProps(), mapDispatchToProps, mergeProps);

const withMapProps = withProps({
  googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
  loadingElement: <div style={{ height: '100%' }} />,
});

const GeoSuggestion = compose(
  withMapProps,
  withScriptjs,
  withReduxConnect,
)(GeoSuggestionTemplate);

export default GeoSuggestion;
