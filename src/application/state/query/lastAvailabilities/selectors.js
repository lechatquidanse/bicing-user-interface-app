export const lastAvailabilitiesSelector = (state) => {
    const lastAvailabilities = state.query.lastAvailabilities.data;

    return lastAvailabilities && lastAvailabilities['hydra:member'] ? lastAvailabilities['hydra:member'] : null;
};
