const selector = state => state.command.storeItineraryStepActive;

export const itineraryStep = state => selector(state).itineraryStep;

export default itineraryStep;
