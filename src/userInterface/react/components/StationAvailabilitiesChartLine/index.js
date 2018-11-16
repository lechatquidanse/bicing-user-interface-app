import React from 'react';
import { Line } from 'react-chartjs-2';

import {
    AvailableBikeMinChartLineDatasets,
    AvailableBikeMaxChartLineDatasets,
    AvailableBikeAvgChartLineDatasets,
    AvailableSlotMinChartLineDatasets,
    AvailableSlotMaxChartLineDatasets,
    AvailableSlotAvgChartLineDatasets
} from 'userInterface/react/components/StationAvailabilitiesChartLineDatasets';

const StationAvailabilitiesChartLine = ({ stationAvailabilities, type = 'availableBike' }) => {
    const datasets = [];

    if (type === 'availableBike') {
        datasets.push(AvailableBikeMinChartLineDatasets(stationAvailabilities.datasetsAvailableBikeMin));
        datasets.push(AvailableBikeMaxChartLineDatasets(stationAvailabilities.datasetsAvailableBikeMax));
        datasets.push(AvailableBikeAvgChartLineDatasets(stationAvailabilities.datasetsAvailableBikeAvg));
    } else {
        datasets.push(AvailableSlotMinChartLineDatasets(stationAvailabilities.datasetsAvailableSlotMin));
        datasets.push(AvailableSlotMaxChartLineDatasets(stationAvailabilities.datasetsAvailableSlotMax));
        datasets.push(AvailableSlotAvgChartLineDatasets(stationAvailabilities.datasetsAvailableSlotAvg));
    }

    return <Line data={{
        labels: stationAvailabilities.datasetslabels,
        datasets
    }} />;
}

export default StationAvailabilitiesChartLine;
