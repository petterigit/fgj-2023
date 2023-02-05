import { EnemyLogic, RangedAttack } from 'consts';
import { Engine, randomInRange, Ray, vec, Vector } from 'excalibur';
import { Player } from 'game/objects/player/Player';
import { PlayerPreUpdateLogic, PlayerPreUpdateLogicProps } from 'game/types';

export const bossLogic = enemyLogic;

export function enemyLogic(): PlayerPreUpdateLogic {
    let player: Player | undefined | null = null;
    let battleMode = false;

    const changeStateCooldown = randomInRange(
        EnemyLogic.minStateChangeCooldown,
        EnemyLogic.maxStateChangeCooldown
    );
    let currentChangeStateCooldown = changeStateCooldown;

    const meleeAttackCooldown = randomInRange(
        EnemyLogic.minMeleeAttackCooldown,
        EnemyLogic.maxMeleeAttackCooldown
    );
    let currentMeleeAttackCooldown = meleeAttackCooldown;

    const meleeAttackWaitDuration = randomInRange(
        EnemyLogic.minPreMeleeAttackWait,
        EnemyLogic.maxPreMeleeAttackWait
    );
    let currentMeleeAttackWaitDuration = meleeAttackWaitDuration;

    const rangedAttackCooldown = randomInRange(
        EnemyLogic.minRangedAttackCooldown,
        EnemyLogic.maxRangedAttackCooldown
    );
    let currentRangedAttackCooldown = rangedAttackCooldown;

    const wanderCooldown = randomInRange(
        EnemyLogic.minMeleeAttackCooldown,
        EnemyLogic.maxMeleeAttackCooldown
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
        let meleeAttack = false,
            rangedAttack = false,
            dash = false;

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
        if (currentMeleeAttackCooldown > 0) {
            currentMeleeAttackCooldown -= delta;
        }
        if (currentRangedAttackCooldown > 0) {
            currentRangedAttackCooldown -= delta;
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
            const isInMeleeRange = isPlayerClose(x, y, EnemyLogic.hitRange);

            // Handle attack wait timer
            if (
                !isInMeleeRange &&
                currentMeleeAttackWaitDuration < meleeAttackWaitDuration
            ) {
                currentMeleeAttackWaitDuration += delta;
            }

            // Handle ranged attack
            if (
                !isInMeleeRange &&
                currentRangedAttackCooldown < 0 &&
                Math.random() < EnemyLogic.rangedAttackChance
            ) {
                rangedAttack = true;
                currentRangedAttackCooldown = rangedAttackCooldown;
            }

            // Handle melee attack
            if (currentMeleeAttackCooldown < 0 && isInMeleeRange) {
                if (currentMeleeAttackWaitDuration < 0) {
                    currentMeleeAttackCooldown = meleeAttackCooldown;
                    this.meleeAttackReset = true;
                    meleeAttack = true;
                } else {
                    currentMeleeAttackWaitDuration -= delta;
                }
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
                actions: { meleeAttack, dash, rangedAttack },
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
                    actions: { meleeAttack, dash, rangedAttack },
                    speed: 0,
                };
            }

            const angle = Math.random() * Math.PI * 2;
            x = Math.cos(angle) * 10;
            y = Math.sin(angle) * 10;

            return {
                input: getDirection(x, y),
                actions: { meleeAttack, dash, rangedAttack },
                speed: EnemyLogic.normalSpeed,
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
    if (x < EnemyLogic.navigationDirectionThreshold) {
        newX = -1;
    }
    if (x >= -EnemyLogic.navigationDirectionThreshold) {
        if (newX === -1) {
            newX = 0;
        } else {
            newX = 1;
        }
    }

    if (y < EnemyLogic.navigationDirectionThreshold) {
        newY = -1;
    } else if (y >= -EnemyLogic.navigationDirectionThreshold) {
        if (newY === -1) {
            newY = 0;
        } else {
            newY = 1;
        }
    }
    return vec(newX, newY);
}
