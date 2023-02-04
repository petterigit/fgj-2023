import { normalizeAndScale } from 'game/engine/physics/vectors';
import { Player } from 'game/objects/player/Player';

/**
 * Dash to current direction (vel) by
 *  this.stats.speed / 10
 */
export function dash(this: Player) {
    const posChange = normalizeAndScale(
        this.vel.x,
        this.vel.y,
        this.stats.speed / 10
    );
    this.pos = this.pos.add(posChange);
}
