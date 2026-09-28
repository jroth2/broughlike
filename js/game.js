
const htmltag = document.querySelector("html");





function setupCanvas() {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");


    canvas.width = tileSize * (numTiles + uiWidth);
    canvas.height = tileSize * numTiles;
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';

    ctx.imageSmoothingEnabled = false;
}

function drawSprite(sprite, x, y) {
    ctx.drawImage(
        spritesheet,
        sprite * 16,
        0,
        16,
        16,
        x * tileSize,
        y * tileSize,
        tileSize,
        tileSize
    );

}

function draw() {
    // clears old char position
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numTiles; i++) {
        for (let j = 0; j < numTiles; j++) {
            getTile(i, j).draw();
        }
    }

    // draws character square
    //ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    player.draw();

    for (const monster of monsters) {
        monster.draw();
    }

}

function tick() {
    for (let k = monsters.length - 1; k >= 0; k--) {
        if (!monster[k].dead) {
            monsters[k].update();
        } else {
            monsters.splice(k, 1)
        }
    }
}