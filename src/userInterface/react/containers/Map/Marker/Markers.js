import { selectors as queryStationsSelectors } from 'application/state/query/stations';
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

const mapStateToProps = state => ({
  data: queryStationsSelectors.data(state),
  isFetchingStations: queryStationsSelectors.isFetching(state),
  error: queryStationsSelectors.error(state),
  latitude: queryStationsSelectors.latitude(state),
  longitude: queryStationsSelectors.longitude(state),
  limit: queryStationsSelectors.limit(state),
});

const withReduxConnect = connect(mapStateToProps);

const isLoadingStations = props => props.isFetchingStations;
const isNothingStations = props => props.data === undefined;
const isEmptyStations = props => props.data.length === 0;
const isErrorStations = props => props.error === true;

const Markers = compose(
  withReduxConnect,
  branch(isErrorStations, renderComponent(MarkersErrorsTemplate)),
  branch(isLoadingStations, renderComponent(MarkersLoadingTemplate)),
  branch(isNothingStations, renderNothing),
  branch(isEmptyStations, renderComponent(MarkersEmptyTemplate)),
)(MarkersTemplate);

export default Markers;
