const selector = state => state.command.map.filter;

export const displayConfiguration = (state) => {
  if (selector(state) === null) {
    return undefined;
  }

  const { latitude, longitude, limit } = selector(state);

  return { latitude, longitude, limit };
};

export default displayConfiguration;
