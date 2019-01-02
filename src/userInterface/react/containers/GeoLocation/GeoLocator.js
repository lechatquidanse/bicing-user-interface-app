import { actions } from 'application/state/query/reverseGeoCode';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { GeoLocator as GeoLocatorTemplate } from 'userInterface/react/components/GeoLocation';

const mapDispatchToProps = dispatch => bindActionCreators({
  onSuccess: position => actions.fetchStart(position.coords.latitude, position.coords.longitude),
}, dispatch);

const withReduxConnect = connect(null, mapDispatchToProps);

const GeoLocator = compose(
  withReduxConnect,
)(GeoLocatorTemplate);

export default GeoLocator;
