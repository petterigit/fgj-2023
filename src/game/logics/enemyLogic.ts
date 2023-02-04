import { EnemyLogic } from 'consts';
import { Engine, randomInRange, vec, Vector } from 'excalibur';
import { Player } from 'game/objects/player/Player';
import { PlayerPreUpdateLogic, PlayerPreUpdateLogicProps } from 'game/types';

export function newEnemyLogic(): PlayerPreUpdateLogic {
    let player: Player | undefined | null = null;
    let battleMode = false;

    const changeStateCooldown = randomInRange(
        EnemyLogic.minStateChangeCooldown,
        EnemyLogic.maxStateChangeCooldown
    );
    let currentChangeStateCooldown = changeStateCooldown;

    const meleeAttackCooldown = randomInRange(
        EnemyLogic.minAttackCooldown,
        EnemyLogic.maxAttackCooldown
    );
    let currentAttackCooldown = meleeAttackCooldown;

    const wanderCooldown = randomInRange(
        EnemyLogic.minAttackCooldown,
        EnemyLogic.maxAttackCooldown
    );
    let currentWanderCooldown = wanderCooldown;

    const dashCooldown = randomInRange(
        EnemyLogic.minDashCooldown,
        EnemyLogic.maxDashCooldown
    );
    let currentDashCooldown = dashCooldown;

    return function (
        this: Player,
        engine: Engine,
        delta: number
    ): PlayerPreUpdateLogicProps | null {
        let meleeAttack = false;
        let dash = false;

        // Get player from scene
        if (!player) {
            const foundPlayer = this.scene.actors.find(
                actor => actor.name === 'Player'
            );
            if (foundPlayer) {
                player = foundPlayer as Player;
            }
        }
        if (!player) return null;

        let x = player.pos.x - this.pos.x;
        let y = player.pos.y - this.pos.y;

        // Decrease cooldowns
        if (currentChangeStateCooldown > 0) {
            currentChangeStateCooldown -= delta;
        }
        if (currentAttackCooldown > 0) {
            currentAttackCooldown -= delta;
        }
        if (currentWanderCooldown > 0) {
            currentWanderCooldown -= delta;
        }
        if (currentDashCooldown > 0) {
            currentDashCooldown -= delta;
        }

        // Switch modes
        if (currentChangeStateCooldown < 0) {
            if (isPlayerClose(x, y, EnemyLogic.detectionRange)) {
                battleMode = true;
                currentChangeStateCooldown = changeStateCooldown;
            } else {
                currentChangeStateCooldown = changeStateCooldown;
                battleMode = false;
            }
        }

        // Handle battle mode
        if (battleMode) {
            if (
                currentAttackCooldown < 0 &&
                isPlayerClose(x, y, EnemyLogic.hitRange)
            ) {
                currentAttackCooldown = meleeAttackCooldown;
                this.meleeAttackReset = true;
                meleeAttack = true;
            }
            if (
                currentDashCooldown < 0 &&
                isPlayerClose(x, y, EnemyLogic.detectionRange)
            ) {
                if (Math.random() < EnemyLogic.dashChance) {
                    currentDashCooldown = dashCooldown;
                    dash = true;
                }
            }
            return {
                input: getDirection(x, y),
                actions: { meleeAttack, dash },
                speed: dash ? EnemyLogic.dashSpeed : EnemyLogic.chaseSpeed,
            };
        }

        // Handle wander
        if (currentWanderCooldown > 0) {
            return null;
        } else {
            currentWanderCooldown = wanderCooldown;

            if (Math.random() < EnemyLogic.chanceToStayStill) {
                return {
                    input: Vector.Zero,
                    actions: { meleeAttack, dash },
                    speed: 0,
                };
            }

            const angle = Math.random() * Math.PI * 2;
            x = Math.cos(angle) * 10;
            y = Math.sin(angle) * 10;

            return {
                input: getDirection(x, y),
                actions: { meleeAttack, dash },
                speed: 30,
            };
        }
    };
}

function isPlayerClose(x: number, y: number, distance: number) {
    if (Math.abs(x) < distance && Math.abs(y) < distance) {
        return true;
    }
    return false;
}

function getDirection(x: number, y: number) {
    let newX = 0;
    let newY = 0;
    if (x < 0) {
        newX = -1;
    }

    if (x >= 0) {
        newX = 1;
    }

    if (y < 0) {
        newY = -1;
    }

    if (y >= 0) {
        newY = 1;
    }
    return vec(newX, newY);
}
