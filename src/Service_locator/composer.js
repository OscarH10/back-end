const ServiceLocator = require('./dependencyLocator');
const Cloudflare = require('../services/cloudflare');

const dl = ServiceLocator.getInstance();

function init() {
    dl.bindLazySingleton('Cloudflare', () => Cloudflare.getInstance());
}

function getCloudflareService() {
    return dl.get('Cloudflare');
}

module.exports = { init, getCloudflareService }; 