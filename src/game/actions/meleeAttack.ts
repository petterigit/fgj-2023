import { MeleeAttack } from 'consts';
import { Actor, CollisionType, Engine, vec, Vector } from 'excalibur';
import { Player } from 'game/objects/player/Player';
import { CreateAnimations } from 'game/types';
import { vectorDirectionToRadians } from 'util';

export function meleeAttack(
    this: Player,
    engine: Engine,
    animations: CreateAnimations
) {
    const attackPosition = vec(
        this.pos.x + this.currentDirection.x * MeleeAttack.offset,
        this.pos.y + this.currentDirection.y * MeleeAttack.offset
    );

    const swoosh = new Actor({
        pos: attackPosition,
        width: MeleeAttack.width,
        height: MeleeAttack.height,
        collisionType: CollisionType.Passive,
        vel: this.vel,
    });

    const animation = animations.melee();
    if (
        (this.currentDirection.x === Vector.Up.x &&
            this.currentDirection.y === Vector.Up.y) ||
        (this.currentDirection.x === Vector.Down.x &&
            this.currentDirection.y === Vector.Down.y)
    ) {
        animation.flipVertical = true;
    }
    animation.rotation =
        vectorDirectionToRadians(this.currentDirection) + Math.PI / 2;
    swoosh.graphics.use(animation);

    swoosh.on('collisionstart', event => {
        if (
            event.other.id === this.id ||
            (event.other.name !== 'Player' && event.other.name !== 'enemy')
        )
            return;
        console.log('Hitted', event.other.id);
        const target = event.other as Player;
        target.stats.health -= this.stats.attack;
        console.log(target.stats.health);
        console.log(target.name);
    });

    swoosh.actions.delay(MeleeAttack.duration).die();

    engine.currentScene.add(swoosh);
}
