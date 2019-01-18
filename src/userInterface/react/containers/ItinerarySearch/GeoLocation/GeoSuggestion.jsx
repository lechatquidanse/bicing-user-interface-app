/* eslint-disable */
import {
  actions as commandEnableGeoLocationActions,
  selectors as commandEnableGeoLocationSelectors,
} from 'application/state/command/enableGeoLocation';
import { selectors as commandStoreItineraryAtSelectors } from 'application/state/command/storeItineraryAt';
import { actions as commandStoreItineraryGeoLocationActions } from 'application/state/command/storeItineraryGeoLocation';
import { actions as commandStoreItineraryStepActiveActions } from 'application/state/command/storeItineraryStepActive';
import { selectors as queryGeoSuggestionsSelectors } from 'application/state/query/geoSuggestions';
import { selectors as queryReverseGeoCodeSelectors } from 'application/state/query/reverseGeoCode';
import { LIMIT } from 'domain/definitions/configurationMapDefinition';
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

  const fixtures = queryGeoSuggestionsSelectors.geoSuggestions(state);
  fixtures.unshift({ label: 'Use current Location', location: 'geoLocation' });

  return {
    itineraryStep: step,
    itineraryAt: commandStoreItineraryAtSelectors.itineraryAt(state),
    periodStartAt: commandStoreItineraryAtSelectors.periodStartAt(state),
    periodEndAt: commandStoreItineraryAtSelectors.periodEndAt(state),
    interval: commandStoreItineraryAtSelectors.interval(state),
    initialValue,
    fixtures,
  };
};

export const mapDispatchToProps = dispatch => bindActionCreators({
  enableGeoLocation: itineraryStep => commandEnableGeoLocationActions.enable(itineraryStep),
  storeItineraryGeoLocation: (itineraryStep, latitude, longitude) => commandStoreItineraryGeoLocationActions.storeStart(
    itineraryStep,
    latitude,
    longitude,
    LIMIT,
  ),
  storeItineraryStepActive: itineraryStep => commandStoreItineraryStepActiveActions.store(itineraryStep),
}, dispatch);

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => ({
  ...propsFromState,
  ...propsFromDispatch,
  ...ownProps,
  onSuggestSelect: (suggest) => {
    if (suggest === undefined) {
      return null;
    } if (suggest.location === 'geoLocation') {
      return propsFromDispatch.enableGeoLocation(propsFromState.itineraryStep);
    }

    propsFromDispatch.storeItineraryStepActive(propsFromState.itineraryStep);
    return propsFromDispatch.storeItineraryGeoLocation(
      propsFromState.itineraryStep,
      suggest.location.lat,
      suggest.location.lng,
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
