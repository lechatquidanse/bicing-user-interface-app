import PropTypes from 'prop-types';
import React from 'react';

const MapError = ({ error }) => (
  <div data-testid="map-error">
    An error occurred during map
    <p>
      {error}
    </p>
  </div>
);

MapError.propTypes = {
  error: PropTypes.string.isRequired,
};

export default MapError;
