const port = process.env.PORT || 8080;

const path = require('path');
const express = require('express');
const app = express();

const { registerFont } = require('canvas');

const api = require('./api.js');
const generator = require('./generator.js');

app.disable('x-powered-by');

registerFont(path.resolve('assets/Inter-Bold.ttf'), { family: 'InterBold' });

app.get('/robots.txt', async (req, res) => {
    res.setHeader('content-type', 'text/plain');
    res.send("User-agent: *\nDisallow: /");
});

app.get('/*', async (req, res) => {
    const data = await api.getMetadata(req.path);

    if (data == null) {
        res.setHeader('content-type', 'text/plain');
        res.status(404).send("Uh oh. Open graph server was unable to find metadata for this post.");
        return;
    }

    const title = data.title;
    const date = data.date;
    const tags = data.tags.split(',');

    const image = await generator.generateCard(title, date, tags);

    res.setHeader('content-type', 'image/png');
    res.send(image);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});
