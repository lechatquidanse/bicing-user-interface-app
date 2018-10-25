const scope = require('./../../support/scope');

const pending = callback => {
    callback(null, 'pending');
};

const visitHomepage = async (pageName) => {
    scope.context.currentPage = await scope.browser.newPage();
    scope.context.currentPage.setViewport({ width: 1280, height: 1024 });

    const url = scope.host;  //+ pages.home;

    const visit = await scope.context.currentPage.goto(url, {
        waitUntil: 'networkidle2'
    });

    scope.context.currentPage.click('.dismissButton');

    // await scope.context.currentPage.screenshot({ path: './eeemee.png' });

    return visit;
};

const pressButton = async (button) => {
    // scope.context.currentPage
};

module.exports = {
    pending,
    visitHomepage
}
