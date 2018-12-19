const selector = state => state.query.lastAvailabilities;

export const error = state => selector(state).error;
export const isFetching = state => selector(state).isFetching;
export const lastAvailabilities = (state) => {
  const { data } = selector(state);

  return data && data['hydra:member'] ? data['hydra:member'] : null;
};
