import { ACTOR_SPEED } from 'consts';
import {
    Actor,
    ActorArgs,
    Animation,
    CollisionType,
    Input,
    vec,
    Vector,
} from 'excalibur';
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
    private dashTime = 0;
    private dashCooldown = 0;

    constructor(config: PlayerArgs) {
        super({
            name: 'Player',
            radius: 60,
            collisionType: CollisionType.Passive,
            ...config,
        });

        this.animations = config.animations;
        this.animation = PlayerAnimation.Left;
    }

    public onInitialize() {
        const animation = this.animations[this.animation];
        this.graphics.use(animation);
    }

    normalizeAndSetVelocity(velocity: Vector, length = ACTOR_SPEED) {
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

    onPreUpdate(engine: ex.Engine, delta: number) {
        super.onPreUpdate(engine, delta);

        if (this.dashCooldown > 0) {
            this.dashCooldown -= delta;
        }

        if (this.dashTime > 0) {
            this.dashTime -= delta;
        }

        let newX = 0;
        let newY = 0;

        newX = 0;
        newY = 0;

        if (engine.input.keyboard.isHeld(Input.Keys.Left)) {
            newX = -1;
        }

        if (engine.input.keyboard.isHeld(Input.Keys.Right)) {
            newX = 1;
        }

        if (engine.input.keyboard.isHeld(Input.Keys.Up)) {
            newY = -1;
        }

        if (engine.input.keyboard.isHeld(Input.Keys.Down)) {
            newY = 1;
        }

        this.normalizeAndSetVelocity(
            vec(newX, newY),
            this.dashTime > 0 ? 500 : undefined
        );

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
