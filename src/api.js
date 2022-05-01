const fetch = require('node-fetch');

function getMetadata(path) {
    const url = "https://www.maxratmeyer.com/api/posts.json";

    return fetch(url)
        .then(res => res.json())
        .then(json => {
            for (let object in json) {
                if (object == path + '/') {
                    return json[object];
                }
            }

            return null;
        })
        .catch(error => {
            return null;
        });
}

module.exports = { getMetadata };
