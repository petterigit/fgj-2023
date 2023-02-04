import { Actor, Engine, vec } from 'excalibur';
import { Player } from 'game/objects/player/Player';
import { PlayerPreUpdateLogicProps } from 'game/types';

export function enemyLogic(
    this: Player,
    engine: Engine,
    delta: number
): PlayerPreUpdateLogicProps | null {
    this.timer++;
    let x: number;
    let y: number;
    let meleeAttack = false;
    let dash = false;
    if (!this.player) {
        this.player = this.scene.actors.find(actor => actor.name === 'Player')!;
    }

    if (isPlayerClose(this, this.player)) {
        x = this.player.pos.x - this.pos.x;
        y = this.player.pos.y - this.pos.y;
        meleeAttack = true;
        return {
            input: getDirection(x, y),
            actions: { meleeAttack, dash },
            speed: 75,
        };
    }

    if (this.timer % 50 != 0) return null;
    this.timer = Math.floor(Math.random() * (200 - 50 + 1) + 50);
    const angle = Math.random() * Math.PI * 2;
    x = Math.cos(angle) * 10;
    y = Math.sin(angle) * 10;

    return {
        input: getDirection(x, y),
        actions: { meleeAttack, dash },
        speed: 30,
    };
}

function isPlayerClose(enemy: Player, player: Actor) {
    if (
        Math.abs(player.pos.x - enemy.pos.x) < 100 &&
        Math.abs(player.pos.y - enemy.pos.y) < 100
    ) {
        return true;
    }
    return false;
}

function getDirection(x: number, y: number) {
    let newX = 0;
    let newY = 0;
    if (x < 0) {
        newX = -1;
    }

    if (x >= 0) {
        newX = 1;
    }

    if (y < 0) {
        newY = -1;
    }

    if (y >= 0) {
        newY = 1;
    }
    return vec(newX, newY);
}
