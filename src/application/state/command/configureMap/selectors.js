const selector = state => state.command.configureMap;

export const latitude = state => selector(state).latitude;
export const longitude = state => selector(state).longitude;
export const limit = state => selector(state).limit;
export const data = state => selector(state).data;
export const zoom = state => data(state);
export const error = state => selector(state).error;
