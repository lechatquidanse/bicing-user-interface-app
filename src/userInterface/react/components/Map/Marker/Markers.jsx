import PropTypes from 'prop-types';
import React from 'react';

const Markers = ({
  itineraryStep,
  stationIds,
  children,
}) => (stationIds.map(stationId => React.cloneElement(children, {
  key: stationId,
  itineraryStep,
  stationId,
})));

Markers.propTypes = {
  itineraryStep: PropTypes.number.isRequired,
  stationIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};

export default Markers;
