import { MeleeAttack } from 'consts';
import { Actor, CollisionType, Engine, vec, Vector } from 'excalibur';
import { Player } from 'game/objects/player/Player';
import { AudioManager } from 'game/resources/sounds/audiomanager';
import { CreateAnimations } from 'game/types';
import { vectorDirectionToRadians } from '../engine/physics/vectors';

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
        this.currentDirection.equals(Vector.Up) ||
        this.currentDirection.equals(Vector.Down)
    ) {
        animation.flipVertical = true;
    }
    animation.rotation =
        vectorDirectionToRadians(this.currentDirection) + Math.PI / 2;
    swoosh.graphics.use(animation);

    swoosh.on('collisionstart', event => {
        if (
            event.other.id === this.id ||
            (event.other.name !== 'Player' &&
                event.other.name !== 'enemy' &&
                event.other.name !== 'boss')
        ) {
            return;
        }

        const blood = new Actor({
            pos: attackPosition,
            scale: vec(0.5, 0.5),
        });
        blood.graphics.use(animations.blood());
        blood.actions.delay(500).die();

        AudioManager.playRandomHitSound();
        engine.currentScene.camera.shake(
            MeleeAttack.screenshakeDistance,
            MeleeAttack.screenshakeDistance,
            MeleeAttack.screenshakeDuration
        );
        const target = event.other as Player;
        target.changeHealth(-this.stats.attack);
        blood.pos = target.center;
        engine.currentScene.add(blood);
    });

    swoosh.actions.delay(MeleeAttack.duration).die();

    AudioManager.playRandomWhooshSound();
    engine.currentScene.add(swoosh);
}
