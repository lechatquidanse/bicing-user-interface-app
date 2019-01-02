import { nest } from 'recompose';
import GoogleMap from 'userInterface/react/containers/Map/GoogleMap';
import { InfoWindow, Markers, Marker } from 'userInterface/react/containers/Map/Marker';

const Map = nest(GoogleMap, Markers, Marker, InfoWindow);

export default Map;
