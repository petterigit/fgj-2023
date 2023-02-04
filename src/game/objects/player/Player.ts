import { ActorSpeed, MeleeAttack, PlayerDefaultStats } from 'consts';
import {
    Actor,
    ActorArgs,
    Animation,
    CollisionType,
    vec,
    Vector,
} from 'excalibur';
import { meleeAttack } from 'game/actions/meleeAttack';
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
    private preUpdateLogic: PlayerPreUpdateLogic | null = null;
    public currentDirection: Vector = Vector.Down;
    public dashTime = 0;
    public dashCooldown = 0;

    public meleeAttackCooldown = MeleeAttack.cooldown;
    public meleeAttackCurrentCooldown = 0;
    public meleeAttackReset = true;

    public stats = PlayerDefaultStats;

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

    /**
     * Levels character up. Should be called after each level (or whenever wanted..)
     * @returns A level up message for what stats was incresed & how much
     */
    public LevelUp() {
        let random = Math.random() * 3;

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
        }

        return;
    }

    public AddLogic(logic: PlayerPreUpdateLogic) {
        this.preUpdateLogic = logic;
    }

    public onInitialize() {
        const animation = this.animations[this.animation];
        this.graphics.use(animation);
    }

    normalizeAndSetVelocity(velocity: Vector, length = ActorSpeed) {
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

        if (this.meleeAttackCurrentCooldown > 0) {
            this.meleeAttackCurrentCooldown -= delta;
        }

        const props = this.preUpdateLogic?.(engine, delta);
        if (!props) return;

        this.normalizeAndSetVelocity(
            vec(props.input.x, props.input.y),
            this.dashTime > 0 ? 500 : undefined
        );

        const oldAnimation = this.animation;
        const angle = this.vel.toAngle();
        const pi = 3.14;

        if (this.vel.x === 0 && this.vel.y === 0) {
            this.animation = PlayerAnimation.Idle;
        } else if (angle > -pi / 4 && angle < pi / 4) {
            this.animation = PlayerAnimation.Right;
            this.currentDirection = Vector.Right;
        } else if (angle > (-3 * pi) / 4 && angle < -pi / 4) {
            this.animation = PlayerAnimation.Up;
            this.currentDirection = Vector.Up;
        } else if (angle < (-3 * pi) / 4 || angle > (3 * pi) / 4) {
            this.animation = PlayerAnimation.Left;
            this.currentDirection = Vector.Left;
        } else if (angle > pi / 4 && angle < (3 * pi) / 4) {
            this.animation = PlayerAnimation.Down;
            this.currentDirection = Vector.Down;
        }

        if (oldAnimation !== this.animation) {
            this.setAnimation();
        }

        if (!props.actions.meleeAttack) {
            this.meleeAttackReset = true;
        }

        if (
            props.actions.meleeAttack &&
            this.meleeAttackReset &&
            this.meleeAttackCurrentCooldown <= 0
        ) {
            const boundMeleeAttack = meleeAttack.bind(this);
            boundMeleeAttack(engine);
            this.meleeAttackCurrentCooldown = this.meleeAttackCooldown;
            this.meleeAttackReset = false;
        }
    }
}
