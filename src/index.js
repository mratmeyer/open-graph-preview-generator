const port = process.env.PORT || 8080;

const api = require('./api.js');
const utils = require('./utils.js');

const path = require('path');
const express = require('express');
const { createCanvas, loadImage, registerFont } = require('canvas');

const app = express();

registerFont(path.resolve('assets/Inter-Bold.ttf'), { family: 'InterBold' });

app.get('/*', async (req, res) => {
    const data = await api.getMetadata(req.path);

    if (data == null) {
        res.setHeader('content-type', 'text/plain');
        res.send("Invalid data source!");
        return;
    }

    const title = data.title;
    const date = data.date;
    const description = data.description;
    const tags = data.tags[0].split(',');

    const canvas = createCanvas(1280, 704)
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const image = await loadImage(path.resolve('assets/profile-256x256.png'));
    ctx.drawImage(image, 50, 50, 178, 178);

    ctx.font = '100px InterBold';
    ctx.fillStyle = "black";
    ctx.fillText(utils.formatText(ctx, title), 50, 350);

    ctx.font = '65px InterBold';
    ctx.fillText("Max Ratmeyer's Blog", 275, 165);

    ctx.font = '40px InterBold';
    ctx.fillStyle = "#414A4C";
    ctx.fillText(date, 50, 664);

    let formattedTags = 'Tagged: ';
    for(i in tags) {
        let tag = tags[i].charAt(0).toUpperCase() + tags[i].slice(1);
        if (i < tags.length - 1) {
            formattedTags = formattedTags + tag + ", ";
        } else {
            formattedTags = formattedTags + tag;
        }
    }

    ctx.font = '40px InterBold';
    ctx.fillStyle = "#414A4C";
    ctx.fillText(formattedTags, 600, 664);

    res.setHeader('content-type', 'image/png');
    res.send(canvas.toBuffer('image/png'));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});
