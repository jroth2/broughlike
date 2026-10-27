class Monster {
    constructor(tile, sprite, hp) {
        this.move(tile);
        this.sprite = sprite;
        this.hp = hp;
        this.maxHp = 6;
        this.isPlayer = false;

        this.teleportCounter = 2;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    update() {
        this.teleportCounter--;
        if (this.stunned || this.teleportCounter > 0) {
            this.drawStatus();
            this.stunned = false;
            return;
        }

        this.doStuff();

    }

    heal(damage) {
        this.hp = Math.min(this.maxHp, this.hp + damage)
    }

    doStuff() {
        let neighbors = this.tile.getAdjacentPassableNeighbors();
        neighbors = neighbors.filter(t => !t.monster || t.monster.isPlayer);

        if (neighbors.length) {
            neighbors.sort((a, b) => a.dist(player.tile) - b.dist(player.tile));
            let newTile = neighbors[0];
            this.tryMove(newTile.x - this.tile.x, newTile.y - this.tile.y)
        }
    }
    getDisplayX() {
        return this.tile.x + this.offsetX;
    }
    getDisplayY() {
        return this.tile.y + this.offsetY;
    }

    draw() {
        //what to draw when monster spawning in
        if (this.teleportCounter > 0) {
            drawSprite(11, this.getDisplayX(), this.getDisplayY())
            //what to draw on normal turn
        } else {
            drawSprite(this.sprite, this.getDisplayX(), this.getDisplayY());
            this.drawHp();

        }
        //reduces offset gradually for animations
        this.offsetX -= Math.sign(this.offsetX) * (1 / 8);
        this.offsetY -= Math.sign(this.offsetY) * (1 / 8);
    }

    drawHp() {
        for (let i = 0; i < this.hp; i++) {
            drawSprite(
                10,
                this.getDisplayX() + (i % 3) * (5 / 16),
                this.getDisplayY() - Math.floor(i / 3) * (5 / 16)
            );
        }
    }

    drawStatus() {
        if (this.stunned && !this.isPlayer) {
            drawSprite(
                15,
                this.getDisplayX(),
                this.getDisplayY()
            )
        }
    }

    tryMove(dx, dy) {
        let newTile = this.tile.getNeighbor(dx, dy);
        if (newTile.passable) {
            if (!newTile.monster) {
                this.move(newTile);
            } else {
                // this is when an attack occurs
                if (this.isPlayer != newTile.monster.isPlayer) {
                    this.attackedThisTurn = true;
                    newTile.monster.stunned = true;
                    newTile.monster.hit(1);

                    shakeAmount = 5;

                    this.offsetX = (newTile.x - this.tile.x) / 2;
                    this.offsetY = (newTile.y - this.tile.y) / 2;
                }
            }
            return true;

        }

    }

    hit(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.die();
        }
    }
    die() {
        this.dead = true;
        this.tile.monster = null;
        this.sprite = 1;
    }

    move(tile) {
        if (this.tile) {
            this.tile.monster = null;
            this.offsetX = this.tile.x - tile.x;
            this.offsetY = this.tile.y - tile.y;
        }
        this.tile = tile;
        tile.monster = this;
        tile.stepOn(this);
    }
}
class Player extends Monster {
    constructor(tile) {
        super(tile, 0, 3);
        this.isPlayer = true;
        this.teleportCounter = 0;
    }

    tryMove(dx, dy) {
        if (super.tryMove(dx, dy)) {
            tick();
        }
    }

}

class Snake extends Monster {
    constructor(tile) {
        super(tile, 4, 1)
    }
    doStuff() {
        this.attackedThisTurn = false;
        super.doStuff();

        if (!this.attackedThisTurn) {
            super.doStuff();
        }
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

    update() {
        let startedStunned = this.stunned;
        super.update();
        if (!startedStunned) {
            this.stunned = true;
        }
    }

}
class PantsMan extends Monster {
    constructor(tile) {
        super(tile, 7, 4)
    }
    doStuff() {
        let neighbors = this.tile.getAdjacentPassableNeighbors();
        if (neighbors.length) {
            this.tryMove(neighbors[0].x - this.tile.x, neighbors[0].y - this.tile.y)
        }
    }

}
class Slime extends Monster {
    constructor(tile) {
        super(tile, 8, 1)
    }
    die() {
        let neighbors = this.tile.getAdjacentPassableNeighbors();
        neighbors = neighbors.filter(t => t.monster && t.monster.isPlayer);
        if (neighbors) {
            if (neighbors[0].monster.isPlayer) {
                neighbors[0].monster.heal(1)
            }
        }
        super.die();
    }

}
class Maw extends Monster {
    constructor(tile) {
        super(tile, 9, 2)
    }

    doStuff() {
        let neighbors = this.tile.getAdjacentNeighbors().filter(t => !t.passable && inBounds(t.x, t.y));
        if (neighbors.length) {
            neighbors[0].replace(Floor);
            this.heal(0.5);
        } else {
            super.doStuff();
        }
    }

}
