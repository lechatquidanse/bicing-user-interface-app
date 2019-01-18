import { selectors } from 'application/state/query/stations';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { MarkersByItineraryStep as MarkersByItineraryStepTemplate } from 'userInterface/react/components/Map/Marker';

const mapStateToProps = state => ({
  itinerarySteps: selectors.itinerarySteps(state),
});

const withReduxConnect = connect(mapStateToProps);

const MarkersByItineraryStep = compose(
  withReduxConnect,
)(MarkersByItineraryStepTemplate);

export default MarkersByItineraryStep;
