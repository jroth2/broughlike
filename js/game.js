const htmltag = document.querySelector("html");

htmltag.addEventListener('keyup', function (e) {
    console.log(e.key)
    if (e.key == "w") y--;
    if (e.key == "s") y++;
    if (e.key == "a") x--;
    if (e.key == "d") x++;
});



function setupCanvas() {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");


    canvas.width = tileSize * (numTiles + uiWidth);
    canvas.height = tileSize * numTiles;
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.width + 'px';

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

    // draws character square
    //ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    drawSprite(0, x, y);

}

setupCanvas();

setInterval(draw, 15);

