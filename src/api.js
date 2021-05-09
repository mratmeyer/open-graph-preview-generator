const fetch = require('node-fetch');

function getMetadata(path) {
    const formattedPath = path.replace('.png', '/');
    const formattedURL = "https://www.maxratmeyer.com/api" + formattedPath + "metadata.json";

    return fetch(formattedURL)
        .then(res => res.json())
        .then(json => {
            return json
        })
        .catch(error => {
            return null;
        });
}

module.exports = { getMetadata };
