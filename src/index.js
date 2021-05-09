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

    const canvas = createCanvas(1280, 644)
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const text = data.title;
    const color = "black";
    const fontSize = '100px';
    const font = 'InterBold';

    const image = await loadImage(path.resolve('assets/profile-256x256.png'));
    ctx.drawImage(image, 50, 50, 178, 178);

    ctx.font = fontSize + ' ' + font;
    ctx.fillStyle = color;
    ctx.fillText(utils.formatText(ctx, text), 50, 350);

    ctx.font = '65px' + ' ' + 'InterBold';
    ctx.fillText("Max Ratmeyer's Blog", 275, 165);

    res.setHeader('content-type', 'image/png');
    res.send(canvas.toBuffer('image/png'));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});
