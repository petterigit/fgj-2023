import { Actor, ActorArgs, Animation, CollisionType, Vector } from 'excalibur';
import { normalizeAndScale } from 'game/engine/physics/vectors';

interface PlayerArgs extends ActorArgs {
    animations: Record<PlayerAnimation, Animation>;
}

const enum PlayerAnimation {
    Idle = 'idle',
    Left = 'left',
    Right = 'right',
    Up = 'up',
    Down = 'down',
}

export class Player extends Actor {
    protected animations: PlayerArgs['animations'];
    protected animation: PlayerAnimation;

    constructor(config: PlayerArgs) {
        super({
            name: 'Player',
            radius: 60,
            collisionType: CollisionType.Active,
            ...config,
        });

        this.animations = config.animations;
        this.animation = PlayerAnimation.Idle;
    }

    public onInitialize() {
        const animation = this.animations[this.animation];
        this.graphics.use(animation);
    }

    // getAnimation(sprites: Sprite[], duration = 80) {
    //     const frames: Frame[] = [];

    //     for (let i = 0, len = sprites.length; i < len; i++) {
    //         frames.push({
    //             graphic: sprites[i],
    //             duration: duration,
    //         });
    //     }

    //     return new Animation({ frames });
    // }

    normalizeAndSetVelocity(velocity: Vector, length = 350) {
        const normalizedVector = normalizeAndScale(
            velocity.x,
            velocity.y,
            length
        );
        this.vel.x = normalizedVector.x;
        this.vel.y = normalizedVector.y;
    }

    setAnimation() {
        this.graphics.use(this.animations[this.animation]);
    }

    onPreUpdate() {
        const oldAnimation = this.animation;
        const angle = this.vel.toAngle();
        const pi = 3.14;

        if (this.vel.x === 0 && this.vel.y === 0) {
            this.animation = PlayerAnimation.Idle;
        } else if (angle > -pi / 4 && angle < pi / 4) {
            this.animation = PlayerAnimation.Right;
        } else if (angle > (-3 * pi) / 4 && angle < -pi / 4) {
            this.animation = PlayerAnimation.Up;
        } else if (angle < (-3 * pi) / 4 || angle > (3 * pi) / 4) {
            this.animation = PlayerAnimation.Left;
        } else if (angle > pi / 4 && angle < (3 * pi) / 4) {
            this.animation = PlayerAnimation.Down;
        }

        if (oldAnimation !== this.animation) {
            this.setAnimation();
        }
    }
}
