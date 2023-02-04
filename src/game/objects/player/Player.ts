import { ACTOR_SPEED } from 'consts';
import {
    Actor,
    ActorArgs,
    Animation,
    CollisionType,
    vec,
    Vector,
} from 'excalibur';
import { normalizeAndScale } from 'game/engine/physics/vectors';
import { PlayerPreUpdateLogic } from 'game/types';

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
    private preUpdateLogic: PlayerPreUpdateLogic | null = null;
    public timer = 0;

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

    public AddLogic(logic: PlayerPreUpdateLogic | null) {
        this.preUpdateLogic = logic;
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

        const props = this.preUpdateLogic?.(engine, delta);
        if (!props) return;

        if (this.dashCooldown > 0) {
            this.dashCooldown -= delta;
        }

        if (this.dashTime > 0) {
            this.dashTime -= delta;
        }

        this.normalizeAndSetVelocity(
            vec(props.input.x, props.input.y),
            props.speed
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
