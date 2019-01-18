import PropTypes from 'prop-types';
import React from 'react';

const MarkersByItineraryStep = ({ itinerarySteps, children }) => (itinerarySteps.map(
  itineraryStep => React.cloneElement(children, {
    itineraryStep,
    key: itineraryStep,
  }),
));

MarkersByItineraryStep.propTypes = {
  itinerarySteps: PropTypes.arrayOf(PropTypes.number).isRequired,
  children: PropTypes.node.isRequired,
};

export default MarkersByItineraryStep;
