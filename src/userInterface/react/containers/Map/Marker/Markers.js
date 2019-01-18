import { selectors } from 'application/state/query/stations';
import { connect } from 'react-redux';
import {
  branch, compose, renderComponent, renderNothing,
} from 'recompose';
import {
  Markers as MarkersTemplate,
  MarkersEmpty as MarkersEmptyTemplate,
  MarkersErrors as MarkersErrorsTemplate,
  MarkersLoading as MarkersLoadingTemplate,
} from 'userInterface/react/components/Map/Marker';

const mapStateToProps = (state, props) => ({
  isFetching: selectors.isFetchingByItineraryStep(props.itineraryStep)(state),
  isError: selectors.isErrorByItineraryStep(props.itineraryStep)(state),
  stationIds: selectors.stationIdsByItineraryStep(props.itineraryStep)(state),
});

const withReduxConnect = connect(mapStateToProps);

const isLoading = props => props.isFetching === true;
const isNothing = props => props.stationIds === undefined;
const isEmpty = props => props.stationIds.length === 0;
const isError = props => props.isError === true;

const Markers = compose(
  withReduxConnect,
  branch(isError, renderComponent(MarkersErrorsTemplate)),
  branch(isLoading, renderComponent(MarkersLoadingTemplate)),
  branch(isNothing, renderNothing),
  branch(isEmpty, renderComponent(MarkersEmptyTemplate)),
)(MarkersTemplate);

export default Markers;
