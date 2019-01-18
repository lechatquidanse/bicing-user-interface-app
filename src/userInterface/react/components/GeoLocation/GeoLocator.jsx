import PropTypes from 'prop-types';
import React from 'react';
import Geolocation from 'react-geolocation';

const GeoLocator = ({ onSuccess }) => (

  <Geolocation
    onSuccess={onSuccess}
  />
);

GeoLocator.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default GeoLocator;
