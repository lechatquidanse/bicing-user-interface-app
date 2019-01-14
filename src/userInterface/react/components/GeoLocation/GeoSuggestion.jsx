/* eslint-disable */
import Proptypes from 'prop-types';
import React from 'react';
import Geosuggest from 'react-geosuggest';
import 'userInterface/react/components/GeoLocation/stylesheets/geo-suggest.css';

const GeoSuggestion = ({
  initialValue, fixtures, placeholder, onSuggestSelect,
}) => (
  <Geosuggest
    initialValue={initialValue}
    placeholder={placeholder}
    fixtures={fixtures}
    onSuggestSelect={onSuggestSelect}
    types={['geocode']}
  />
);

GeoSuggestion.propTypes = {
  initialValue: Proptypes.string,
  fixtures: Proptypes.array,
  placeholder: Proptypes.string,
  onSuggestSelect: Proptypes.func.isRequired,
};

GeoSuggestion.defaultProps = {
  initialValue: undefined,
  fixtures: [],
  placeholder: 'Where?',
};

export default GeoSuggestion;
