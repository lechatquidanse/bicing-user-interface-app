const selectors = require('./selectors');
const scope = require('./../../support/scope');

const assertStationsWithStatus = async (number, status) => {
    // @todo find a way to mock HttpStationQuery in cucumber env (no es6....)
};

const assertMapHasStationsMarker = async (number, marker) => {
    await scope.context.currentPage.waitForSelector(selectors.map.view);
    await scope.context.currentPage.waitForSelector(selectors.map.markers.electric_bike);

    await scope.context.currentPage.screenshot({ path: './eeemee.png' });
};

module.exports = {
    assertStationsWithStatus,
    assertMapHasStationsMarker
};
