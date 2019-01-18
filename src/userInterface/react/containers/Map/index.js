import { nest } from 'recompose';
import GoogleMap from 'userInterface/react/containers/Map/GoogleMap';
import {
  InfoWindow, Markers, Marker, MarkersByItineraryStep,
} from 'userInterface/react/containers/Map/Marker';

const Map = nest(GoogleMap, MarkersByItineraryStep, Markers, Marker, InfoWindow);

export default Map;
