import React from 'react';
import GeoLocator from 'userInterface/react/containers/ItinerarySearch/GeoLocation/GeoLocator';
import GeoSuggestion from 'userInterface/react/containers/ItinerarySearch/GeoLocation/GeoSuggestion';

const GeoLocation = ({ itineraryStep }) => <>
  <GeoLocator itineraryStep={itineraryStep} />
  <GeoSuggestion itineraryStep={itineraryStep} />
  </>;
export default GeoLocation;
