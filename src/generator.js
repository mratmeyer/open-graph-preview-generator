const utils = require('./utils.js');
const path = require('path');

const { createCanvas, loadImage } = require('canvas');

async function generateCard(title, date, tags) {
    const canvas = createCanvas(1280, 734)
    const ctx = canvas.getContext('2d')

    // ctx.fillStyle = "white";
    ctx.fillStyle = "#191919";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const image = await loadImage(path.resolve('assets/profile-256x256.png'));
    ctx.drawImage(image, 50, 50, 178, 178);

    ctx.font = '100px Sora-Bold';
    // ctx.fillStyle = "black";
    ctx.fillStyle = "#E1E1E1";
    ctx.fillText(utils.formatText(ctx, title), 50, 350);

    ctx.font = '65px Sora-Bold';
    ctx.fillText("Max Ratmeyer's Blog", 275, 165);

    ctx.font = '40px Sora-Bold';
    // ctx.fillStyle = "#414A4C";
    ctx.fillStyle = "#E1E1E1";
    ctx.fillText(date, 50, 679);

    let formattedTags = 'Tagged: ';
    for(i in tags) {
        let tag = tags[i].charAt(0).toUpperCase() + tags[i].slice(1);

        if (tag != 'Posts') {
            if (i < tags.length - 1) {
                formattedTags = formattedTags + tag + ", ";
            } else {
                formattedTags = formattedTags + tag;
            }
        }
    }

    ctx.font = '40px Sora-Bold';
    // ctx.fillStyle = "#414A4C";
    ctx.fillStyle = "#E1E1E1";
    ctx.fillText(formattedTags, 1230 - ctx.measureText(formattedTags).width, 679);

    return canvas.toBuffer('image/png');
}

module.exports = { generateCard };
