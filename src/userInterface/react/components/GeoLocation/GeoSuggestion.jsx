import { func, string } from 'prop-types';
import React from 'react';
import Geosuggest from 'react-geosuggest';
import 'userInterface/react/components/GeoLocation/stylesheets/geo-suggest.css';

const fixtures = [
  { label: '02 - C/ ROGER DE FLOR, 126', location: { lat: 41.39553, lng: 2.17706 } },
  { label: '35 - C/ SANT RAMON DE PENYAFORT', location: { lat: 41.413592, lng: 2.221153 } },
  { label: '227 - C/ DEL TORRENT DE LES FLORS, 102', location: { lat: 41.407837, lng: 2.158678 } },
];

const GeoSuggestion = ({ initialValue, onSuggestSelect }) => (
  <Geosuggest
    initialValue={initialValue}
    placeholder="Start typing!"
    fixtures={fixtures}
    onSuggestSelect={onSuggestSelect}
  />
);

GeoSuggestion.propTypes = {
  initialValue: string,
  onSuggestSelect: func.isRequired,
};

GeoSuggestion.defaultProps = {
  initialValue: undefined,
};

export default GeoSuggestion;
