
const {Given, When, Then} = require('cucumber');
const Selector = require('testcafe').Selector;

Given('the fleet has {string} stations {string}', async function (number, status) {
    await testController.navigateTo('https://google.com');
  });

When('I go to the {string} page', async function (pageName) {
    var input = Selector('.gLFyf').with({boundTestRun: testController});
    await this.addScreenshotToReport();
    await testController.typeText(input, pageName);
    await testController.pressKey('enter');
  });

Then('I should see {string} stations with {string} marker on the map', async function (string, string2) {
    var firstLink = Selector('#rso').find('a').with({boundTestRun: testController});
    await testController.expect(firstLink.innerText).contains('Home');
});