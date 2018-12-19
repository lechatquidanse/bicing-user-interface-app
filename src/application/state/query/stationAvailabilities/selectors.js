const selector = state => state.query.stationAvailabilities;

export const data = state => selector(state).data;
export const error = state => selector(state).error;
export const isFetching = state => selector(state).isFetching;
export const stationId = state => selector(state).stationId;

export const byIntervalInPeriodFilter = (state) => {
  if (data(state) == null) {
    return null;
  }

  return data(state).filter;
};
export const stationAvailabilitiesSorted = (state) => {
  if (data(state) == null || data(state).availabilities == null) {
    return null;
  }

  const datasetslabels = [];
  const datasetsAvailableSlotMin = [];
  const datasetsAvailableSlotMax = [];
  const datasetsAvailableSlotAvg = [];
  const datasetsAvailableBikeMin = [];
  const datasetsAvailableBikeMax = [];
  const datasetsAvailableBikeAvg = [];

  data(state).availabilities.map((availability) => {
    datasetslabels.push(availability.interval);
    datasetsAvailableSlotMin.push(availability.available_slot_min);
    datasetsAvailableSlotMax.push(availability.available_slot_max);
    datasetsAvailableSlotAvg.push(availability.available_slot_avg);
    datasetsAvailableBikeMin.push(availability.available_bike_min);
    datasetsAvailableBikeMax.push(availability.available_bike_max);
    datasetsAvailableBikeAvg.push(availability.available_bike_avg);

    return null;
  });

  return {
    datasetslabels,
    datasetsAvailableSlotMin,
    datasetsAvailableSlotMax,
    datasetsAvailableSlotAvg,
    datasetsAvailableBikeMin,
    datasetsAvailableBikeMax,
    datasetsAvailableBikeAvg,
  };
};
