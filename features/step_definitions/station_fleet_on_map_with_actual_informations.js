const { Given, When, Then } = require('cucumber');

const {
	visitHomepage,
	pending,
} = require('./support/actions');
const {
	assertStationsWithStatus,
	assertMapHasStationsMarker,
} = require('./support/asserts');


Given('the fleet has {string} stations with status {string}', assertStationsWithStatus);
When('I go to the {string} page', visitHomepage);
Then('I should see {string} stations with {string} marker on the map', assertMapHasStationsMarker);
