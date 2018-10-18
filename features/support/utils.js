const request = require('request-promise-native');
const lookup = require('dns').lookup;
const promisify = require('util').promisify;
const dnsLookup = promisify(lookup);

const launchBrowser = async () => {
    const { address } = await dnsLookup('test-feature');
    const options = {
        uri: `http://${address}:9222/json/version`,
        json: true,
        resolveWithFullResponse: true
    };

    return request(options)
        .then((res) => res.body.webSocketDebuggerUrl)
        .catch((err) => console.log(err.message));
}

module.exports = {
    launchBrowser
}
