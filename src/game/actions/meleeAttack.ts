import { MeleeAttack } from 'consts';
import { Actor, CollisionType, Engine, vec } from 'excalibur';
import { Player } from 'game/objects/player/Player';

export function meleeAttack(this: Player, engine: Engine) {
    const attackPosition = vec(
        this.pos.x + this.currentDirection.x * MeleeAttack.offset,
        this.pos.y + this.currentDirection.y * MeleeAttack.offset
    );

    const swoosh = new Actor({
        pos: attackPosition,
        width: MeleeAttack.width,
        height: MeleeAttack.height,
        collisionType: CollisionType.Passive,
        // Add spritesheet here
    });

    swoosh.on('collisionstart', event => {
        console.log('Hitted', event.other.id);
    });

    swoosh.actions.delay(MeleeAttack.duration).die();

    engine.currentScene.add(swoosh);
}
