const selector = state => state.command.configureMap;
const data = state => selector(state).data;

export const latitude = state => selector(state).latitude;
export const longitude = state => selector(state).longitude;
export const limit = state => selector(state).limit;
export const isError = state => selector(state).error;
export const error = state => (data(state) instanceof Error ? data(state).message : undefined);
export const zoom = state => (isError(state) === true ? undefined : data(state));
