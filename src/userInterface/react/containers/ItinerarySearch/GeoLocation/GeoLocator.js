/* eslint-disable */
import { LIMIT } from 'domain/definitions/configurationMapDefinition';
import { selectors } from 'application/state/command/enableGeoLocation';
import { actions as commandStoreItineraryGeoLocationActions } from 'application/state/command/storeItineraryGeoLocation';
import { actions as commandStoreItineraryStepActiveActions } from 'application/state/command/storeItineraryStepActive';
import { actions as queryReverseGeoCodeActions } from 'application/state/query/reverseGeoCode';
import { connect } from 'react-redux';
import { branch, compose, renderNothing } from 'recompose';
import { bindActionCreators } from 'redux';
import { GeoLocator as GeoLocatorTemplate } from 'userInterface/react/components/GeoLocation';

const mapStateToProps = state => ({
  isEnabled: selectors.isEnabled(state),
  itineraryStep: selectors.itineraryStep(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  // @tood itineraryStep
  queryReverseGeoCode: (latitude, longitude, itineraryStep) => queryReverseGeoCodeActions.fetchStart(
    latitude,
    longitude,
    itineraryStep,
  ),
  storeItineraryGeoLocation: (itineraryStep, latitude, longitude) => commandStoreItineraryGeoLocationActions.storeStart(
    itineraryStep,
    latitude,
    longitude,
  ),
  storeItineraryStepActive: itineraryStep => commandStoreItineraryStepActiveActions.store(itineraryStep),
}, dispatch);

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => ({
  ...propsFromState,
  ...propsFromDispatch,
  ...ownProps,
  onSuccess: (position) => {
    const { coords: { latitude, longitude } } = position;

    propsFromDispatch.storeItineraryStepActive(propsFromState.itineraryStep);
    propsFromDispatch.storeItineraryGeoLocation(propsFromState.itineraryStep, latitude, longitude, LIMIT);
    propsFromDispatch.queryReverseGeoCode(latitude, longitude, propsFromState.itineraryStep);
  },
});

const withReduxConnect = connect(mapStateToProps, mapDispatchToProps, mergeProps);

const isDisabled = props => props.isEnabled === false;

const GeoLocator = compose(
  withReduxConnect,
  branch(isDisabled, renderNothing),
)(GeoLocatorTemplate);

export default GeoLocator;
