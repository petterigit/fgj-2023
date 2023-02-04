import { Engine, vec } from 'excalibur';
import { Player } from 'game/objects/player/Player';
import { PlayerPreUpdateLogicProps } from 'game/types';

export function enemyLogic(
    this: Player,
    engine: Engine,
    delta: number
): PlayerPreUpdateLogicProps | null {
    this.timer++;
    let meleeAttack = false;
    if (!this.player) {
        this.player = this.scene.actors.find(actor => actor.name === 'Player');
    }

    this.player = this.player as Player;

    let x = this.player.pos.x - this.pos.x;
    let y = this.player.pos.y - this.pos.y;

    if (isPlayerVeryClose(x, y)) {
        if (this.timer % 50 == 0) {
            this.meleeAttackReset = true;
        }
        meleeAttack = true;
        return {
            input: getDirection(x, y),
            actions: { meleeAttack },
            speed: 75,
        };
    }

    if (isPlayerClose(x, y)) {
        return {
            input: getDirection(x, y),
            actions: { meleeAttack },
            speed: 75,
        };
    }

    if (this.timer % 50 != 0) return null;
    const angle = Math.random() * Math.PI * 2;
    x = Math.cos(angle) * 10;
    y = Math.sin(angle) * 10;

    return { input: getDirection(x, y), actions: { meleeAttack }, speed: 30 };
}

function isPlayerClose(x: number, y: number) {
    if (Math.abs(x) < 100 && Math.abs(y) < 150) {
        return true;
    }
    return false;
}

function isPlayerVeryClose(x: number, y: number) {
    if (Math.abs(x) < 20 && Math.abs(y) < 20) {
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
