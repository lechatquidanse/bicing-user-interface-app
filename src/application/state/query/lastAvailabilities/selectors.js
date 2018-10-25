export const lastAvailabilities = state => state.query.lastAvailabilities;
export const lastAvailabilitiesData = state => state.query.lastAvailabilities.lastAvailabilities;
export const lastAvailabilitiesDataList = (state) => {
    const lastAvailabilities = state.query.lastAvailabilities.lastAvailabilities;

    return lastAvailabilities['hydra:member'] ? lastAvailabilities['hydra:member'] : [];
};
