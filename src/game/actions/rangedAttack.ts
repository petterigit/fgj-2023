import { MeleeAttack, RangedAttack } from 'consts';
import { Actor, CollisionType, Engine, RotationType, vec } from 'excalibur';
import { Player } from 'game/objects/player/Player';
import { AudioManager } from 'game/resources/sounds/audiomanager';
import { CreateAnimations, CreateSpriteSheets, Projectile } from 'game/types';

export function rangedAttack(
    this: Player,
    engine: Engine,
    animations: CreateAnimations,
    spritesheets: CreateSpriteSheets,
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

    const rock = spritesheets.rocks.Rock2!;
    rock.scale = vec(0.3, 0.3);
    projectile.graphics.use(rock);

    projectile.on('collisionstart', event => {
        if (event.other.id === projectile.sender) {
            return;
        }

        if (event.other.name === 'enemy' || event.other.name === 'boss') {
            const blood = new Actor({
                pos: event.other.center,
                scale: vec(0.5, 0.5),
            });
            blood.graphics.use(animations.blood());
            blood.actions.delay(500).die();
            engine.currentScene.add(blood);
            AudioManager.playRandomHitSound();
        }

        engine.currentScene.camera.shake(
            MeleeAttack.screenshakeDistance,
            MeleeAttack.screenshakeDistance,
            MeleeAttack.screenshakeDuration
        );
        const target = event.other as Player;
        if (target.stats != null) {
            target.stats.health -= this.stats.attack;
        }
        projectile.kill();
    });

    projectile.actions
        .rotateTo(
            RangedAttack.rotateSpeed,
            RangedAttack.rotateSpeed,
            RotationType.Clockwise
        )
        .die();

    AudioManager.playRandomWhooshSound();
    engine.currentScene.add(projectile);
}
