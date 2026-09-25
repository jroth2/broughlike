function generateLevel() {
    util.tryTo('generate_map', function () {
        return generateTiles() == randomPassableTile().getConnectedTiles().length;
    });
}

function generateTiles() {
    let passableTiles = 0;
    tiles = [];
    for (let i = 0; i < numTiles; i++) {
        tiles[i] = [];
        for (let j = 0; j < numTiles; j++) {
            if (Math.random() < 0.3 || !inBounds(i, j)) {
                tiles[i][j] = new Wall(i, j);
            } else {
                tiles[i][j] = new Floor(i, j);
                passableTiles++;
            }
        }
    }
    return passableTiles;
}

function inBounds(x, y) {
    return x > 0 && y > 0 && x < numTiles - 1 && y < numTiles - 1;
}

function getTile(x, y) {
    if (inBounds(x, y)) {
        return tiles[x][y];
    } else {
        return new Wall(x, y);
    }
}

function randomPassableTile() {
    let tile;
    util.tryTo('get random passable tile', function () {
        let x = util.randomRange(0, numTiles - 1);
        let y = util.randomRange(0, numTiles - 1);
        tile = getTile(x, y);
        return tile.passable && !tile.monster;

    });
    return tile;
}

