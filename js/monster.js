class Monster {
    constructor(tile, sprite, hp) {
        this.move(tile);
        this.sprite = sprite;
        this.hp = hp;
    }
    draw() {
        drawSprite(this.sprite, this.tile.x, this.tile.y);
    }
    tryMove(dx, dy) {
        let newTile = this.tile.getNeighbor(dx, dy);
        if (newTile.passable) {
            if (!newTile.monster) {
                this.move(newTile);
            }
            return true;

        }

    }

    move(tile) {
        if (this.tile) {
            this.tile.monster = null;
        }
        this.tile = tile;
        tile.monster = this;
    }
}
class Player extends Monster {
    constructor(tile) {
        super(tile, 0, 3);
        this.isPlayer = true;
    }
}

class Snake extends Monster {
    constructor(tile) {
        super(tile, 4, 2)
    }

}
class Bandito extends Monster {
    constructor(tile) {
        super(tile, 5, 3)
    }

}
class Cactus extends Monster {
    constructor(tile) {
        super(tile, 6, 2)
    }

}
class PantsMan extends Monster {
    constructor(tile) {
        super(tile, 7, 4)
    }

}
class Slime extends Monster {
    constructor(tile) {
        super(tile, 8, 1)
    }

}
class Maw extends Monster {
    constructor(tile) {
        super(tile, 9, 5)
    }

}
