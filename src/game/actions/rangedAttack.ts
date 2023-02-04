import { MeleeAttack, RangedAttack } from 'consts';
import { Actor, CollisionType, Engine, vec } from 'excalibur';
import { Player } from 'game/objects/player/Player';
import { AudioManager } from 'game/resources/sounds/audiomanager';
import { CreateAnimations, Projectile } from 'game/types';

export function rangedAttack(
    this: Player,
    engine: Engine,
    animations: CreateAnimations,
    target?: Actor
) {
    // AI Autoaim
    let velocity = this.currentDirection;
    if (target) {
        velocity = target.pos.sub(this.pos).normalize();
    }

    const projectile = new Actor({
        pos: this.pos,
        width: RangedAttack.width,
        height: RangedAttack.height,
        collisionType: CollisionType.Passive,
        vel: velocity.scale(RangedAttack.velocity),
    }) as Projectile;
    projectile.sender = this.id;

    projectile.graphics.use(animations.melee());

    projectile.on('collisionstart', event => {
        if (event.other.id === projectile.sender) {
            return;
        }

        const blood = new Actor({
            pos: event.other.center,
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
        if (target.stats != null) {
            target.stats.health -= this.stats.attack;
        }
        engine.currentScene.add(blood);
    });

    projectile.actions.delay(RangedAttack.duration).die();

    AudioManager.playRandomWhooshSound();
    engine.currentScene.add(projectile);
}
