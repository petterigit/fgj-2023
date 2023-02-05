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
    autoAim?: boolean
) {
    let velocity = this.currentDirection;
    if (autoAim) {
        const target = engine.currentScene.actors.find(
            actor => actor.name === 'Player'
        );
        if (target) {
            velocity = target.pos.sub(this.pos).normalize();
        }
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

        let targetHit = false;
        if (autoAim && event.other.name === 'Player') {
            targetHit = true;
        } else if (
            !autoAim &&
            (event.other.name === 'enemy' || event.other.name === 'boss')
        ) {
            targetHit = true;
        }

        if (targetHit) {
            const blood = new Actor({
                pos: event.other.center,
                scale: vec(0.5, 0.5),
            });
            blood.graphics.use(animations.blood());
            blood.actions.delay(500).die();
            engine.currentScene.add(blood);
            AudioManager.playRandomHitSound();

            const target = event.other as Player;
            if (target.stats != null) {
                target.changeHealth(-this.stats.attack);
            }
        }

        engine.currentScene.camera.shake(
            MeleeAttack.screenshakeDistance,
            MeleeAttack.screenshakeDistance,
            MeleeAttack.screenshakeDuration
        );

        const treeHit = !['enemy', 'boss', 'Player'].includes(event.other.name);
        if (treeHit || targetHit) {
            projectile.kill();
        }
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
