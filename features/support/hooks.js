const { After, Before, BeforeAll, AfterAll } = require('cucumber');
const puppeteer = require('puppeteer');

const { launchBrowser } = require('./utils');
const scope = require('./scope');

BeforeAll(async () => {
    if (!scope.browser) {
        const browserWSEndpoint = await launchBrowser();
        scope.browser = await puppeteer.connect({ browserWSEndpoint });
    }
});

After(async () => {
    if (scope.browser && scope.context.currentPage) {
        const cookies = await scope.context.currentPage.cookies();

        if (cookies && cookies.length > 0) {
            await scope.context.currentPage.deleteCookie(...cookies);
        }

        await scope.context.currentPage.close();
        scope.context.currentPage = null;
    }
});

AfterAll(async () => {
    if (scope.browser) {
        // await scope.browser.close()
        //     .catch((error) => console.log(error));
    }
});
