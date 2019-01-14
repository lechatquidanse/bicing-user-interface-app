import { actions } from 'application/state/query/reverseGeoCode';
import { connect } from 'react-redux';
import { branch, compose, renderNothing } from 'recompose';
import { bindActionCreators } from 'redux';
import { GeoLocator as GeoLocatorTemplate } from 'userInterface/react/components/GeoLocation';
import { selectors } from 'application/state/command/enableGeoLocation';

const mapStateToProps = state => ({
  isEnabled: selectors.isEnabled(state),
  itineraryStep: selectors.itineraryStep(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  reverseGeoCode: (latitude, longitude, itineraryStep) => actions.fetchStart(
    latitude,
    longitude,
    itineraryStep,
  ),
}, dispatch);


const mergeProps = (propsFromState, propsFromDispatch, ownProps) => ({
  ...propsFromState,
  ...propsFromDispatch,
  ...ownProps,
  onSuccess: (position) => {
    const { coords: { latitude, longitude } } = position;

    propsFromDispatch.reverseGeoCode(latitude, longitude, propsFromState.itineraryStep);
  },
});

const withReduxConnect = connect(mapStateToProps, mapDispatchToProps, mergeProps);

const isDisabled = props => props.isEnabled === false;

const GeoLocator = compose(
  withReduxConnect,
  branch(isDisabled, renderNothing),
)(GeoLocatorTemplate);

export default GeoLocator;
