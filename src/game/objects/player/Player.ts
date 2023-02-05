import { MeleeAttack, RangedAttack } from 'consts';
import {
    Actor,
    ActorArgs,
    Animation,
    CollisionType,
    Shape,
    Engine,
    vec,
    Vector,
} from 'excalibur';
import { dash } from 'game/actions/dash';
import { meleeAttack } from 'game/actions/meleeAttack';
import { rangedAttack } from 'game/actions/rangedAttack';
import { normalizeAndScale } from 'game/engine/physics/vectors';
import {
    CreateAnimations,
    CreateSpriteSheets,
    PlayerPreUpdateLogic,
    PlayerPreUpdateLogicGenerator,
} from 'game/types';
import { StatsManager } from './statsmanager';

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
    protected animationProps: CreateAnimations;
    protected spritesheetProps: CreateSpriteSheets;
    private preUpdateLogic:
        | PlayerPreUpdateLogic
        | PlayerPreUpdateLogicGenerator
        | null = null;
    public currentDirection: Vector = Vector.Down;
    public dashTime = 0;
    public dashCooldown = 0;
    public isAi = false;

    public meleeAttackCooldown = MeleeAttack.cooldown;
    public meleeAttackCurrentCooldown = 0;
    public meleeAttackReset = true;

    public rangedAttackCooldown = RangedAttack.cooldown;
    public rangedAttackCurrentCooldown = 0;
    public rangedAttackReset = true;

    public stats = { ...StatsManager.playerStats };

    constructor(
        config: PlayerArgs,
        animations: CreateAnimations,
        spritesheets: CreateSpriteSheets
    ) {
        const collider = Shape.Circle(10);
        collider.offset = new Vector(0, 16);

        super({
            name: 'Player',
            collider: collider,
            collisionType: CollisionType.Active,
            ...config,
        });

        this.animations = config.animations;
        this.animation = PlayerAnimation.Left;
        this.animationProps = animations;
        this.spritesheetProps = spritesheets;
    }

    public AddLogic(logic: PlayerPreUpdateLogic | null) {
        this.preUpdateLogic = logic;
    }

    public AddStatefulLogic(logic: PlayerPreUpdateLogicGenerator | null) {
        this.preUpdateLogic = logic?.() ?? null;
    }

    public onInitialize() {
        const animation = this.animations[this.animation];
        this.graphics.use(animation);
    }

    normalizeAndSetVelocity(velocity: Vector, length = this.stats.speed) {
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

    public changeHealth(amount: number) {
        this.stats.health += amount;
        if (!this.isAi) {
            StatsManager.playerStats.health += amount;
        }
    }

    onPreUpdate(engine: Engine, delta: number) {
        super.onPreUpdate(engine, delta);

        let props = this.preUpdateLogic?.(engine, delta);
        if (typeof props === 'function') {
            const boundProps = props.bind(this);
            props = boundProps?.(engine, delta);
        }

        if (!props) return;

        if (this.dashCooldown > 0) {
            this.dashCooldown -= delta;
        } else {
            this.rotation = 0;
        }

        if (this.meleeAttackCurrentCooldown > 0) {
            this.meleeAttackCurrentCooldown -= delta;
        }

        if (this.rangedAttackCurrentCooldown > 0) {
            this.rangedAttackCurrentCooldown -= delta;
        }

        if (!props.actions.meleeAttack) {
            this.meleeAttackReset = true;
        }

        if (!props.actions.rangedAttack) {
            this.rangedAttackReset = true;
        }

        this.normalizeAndSetVelocity(
            vec(props.input.x, props.input.y),
            props.speed
        );

        const oldAnimation = this.animation;
        const angle = this.vel.toAngle();
        const pi = Math.PI;

        if (this.vel.x === 0 && this.vel.y === 0) {
            this.animation = PlayerAnimation.Idle;
        } else if (angle >= -pi / 4 && angle <= pi / 4) {
            this.animation = PlayerAnimation.Right;
            this.currentDirection = Vector.Right;
        } else if (angle > (-3 * pi) / 4 && angle < -pi / 4) {
            this.animation = PlayerAnimation.Up;
            this.currentDirection = Vector.Up;
        } else if (angle <= (-3 * pi) / 4 || angle >= (3 * pi) / 4) {
            this.animation = PlayerAnimation.Left;
            this.currentDirection = Vector.Left;
        } else if (angle > pi / 4 && angle < (3 * pi) / 4) {
            this.animation = PlayerAnimation.Down;
            this.currentDirection = Vector.Down;
        }

        if (oldAnimation !== this.animation) {
            this.setAnimation();
        }

        if (props.actions.dash && this.dashCooldown <= 0) {
            const boundDash = dash.bind(this);
            boundDash();
            this.dashCooldown = 500;
            this.animation == PlayerAnimation.Left
                ? (this.rotation = (3 * pi) / 2)
                : (this.rotation = pi / 2);
        }

        if (
            props.actions.meleeAttack &&
            this.meleeAttackReset &&
            this.meleeAttackCurrentCooldown <= 0
        ) {
            const boundMeleeAttack = meleeAttack.bind(this);
            boundMeleeAttack(engine, this.animationProps);
            this.meleeAttackCurrentCooldown = this.meleeAttackCooldown;
            this.meleeAttackReset = false;
        }

        if (
            props.actions.rangedAttack &&
            this.rangedAttackReset &&
            this.rangedAttackCurrentCooldown <= 0
        ) {
            const boundRangedAttack = rangedAttack.bind(this);
            boundRangedAttack(
                engine,
                this.animationProps,
                this.spritesheetProps,
                this.isAi
            );
            this.rangedAttackCurrentCooldown = this.rangedAttackCooldown;
            this.rangedAttackReset = false;
        }
    }

    onPostUpdate(engine: Engine, delta: number) {
        super.onPostUpdate(engine, delta);
        if (this.stats.health <= 0) {
            this.kill();
            return;
        }
    }
}
