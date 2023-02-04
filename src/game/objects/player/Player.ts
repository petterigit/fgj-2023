import { MeleeAttack, PlayerDefaultStats, RangedAttack } from 'consts';
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
    PlayerPreUpdateLogic,
    PlayerPreUpdateLogicGenerator,
} from 'game/types';

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
    private preUpdateLogic:
        | PlayerPreUpdateLogic
        | PlayerPreUpdateLogicGenerator
        | null = null;
    public currentDirection: Vector = Vector.Down;
    public dashTime = 0;
    public dashCooldown = 0;

    public meleeAttackCooldown = MeleeAttack.cooldown;
    public meleeAttackCurrentCooldown = 0;
    public meleeAttackReset = true;

    public rangedAttackCooldown = RangedAttack.cooldown;
    public rangedAttackCurrentCooldown = 0;
    public rangedAttackReset = true;

    public stats = { ...PlayerDefaultStats };

    constructor(config: PlayerArgs, animations: CreateAnimations) {
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
    }

    /**
     * Levels character up. Should be called after each level (or whenever wanted..)
     * @returns A level up message for what stats was incresed & how much
     */
    public LevelUp() {
        const random = Math.random() * 3;

        // Todo: Level up by x amount of previous stat instead of fixed
        if (1 > random && random > 0) {
            const attackIncrease = 1;
            this.stats.attack = this.stats.attack + attackIncrease;
            return 'Attack was increased by 1!';
        }

        if (2 > random && random > 1) {
            const healthIncrease = 10;
            this.stats.health = this.stats.health + healthIncrease;
            return 'Health was increased by 10!';
        }

        if (3 > random && random > 2) {
            const speedIncrease = 15;
            this.stats.speed = this.stats.speed + speedIncrease;
            return 'Speed was increased by 15!';
        } else {
            return 'Level up!';
        }
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
            boundRangedAttack(engine, this.animationProps);
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
