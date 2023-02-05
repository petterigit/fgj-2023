/**
 * Constants that are required in both the game & the site
 */

export const GameCanvasID = `game-canvas-${Math.random() * 10000}`;
export const UseDevUtils = 'useDevUtils';

export const TileProperties = {
    width: 16,
    height: 16,
};

export const CharacterAnimationSpeed = 100; // milliseconds per frame
export const ActorSpeed = 100;

export const MeleeAttack = {
    offset: 10,
    width: 20,
    height: 20,
    duration: 200,
    cooldown: 200,
    screenshakeDistance: 5,
    screenshakeDuration: 100,
};

export const RangedAttack = {
    width: 5,
    height: 5,
    velocity: 200,
    cooldown: 1500,
    rotateSpeed: Math.PI * 4, // Two rounds in 1 second
};

export const PlayerDefaultStats = {
    health: 100,
    attack: 10,
    speed: 100,
};

export const EnemyDefaultStats = {
    health: 30,
    attack: 10,
    speed: 30,
};

export const BossDefaultStats = {
    health: EnemyDefaultStats.health * 2,
    attack: EnemyDefaultStats.attack * 2,
    speed: EnemyDefaultStats.speed * 2,
};

export const EnemyLogic = {
    minStateChangeCooldown: 0,
    maxStateChangeCooldown: 5000,
    minMeleeAttackCooldown: 50,
    maxMeleeAttackCooldown: 5000,
    minPreMeleeAttackWait: 500,
    maxPreMeleeAttackWait: 2000,
    minRangedAttackCooldown: 50,
    maxRangedAttackCooldown: 5000,
    minWanderCooldown: 50,
    maxWanderCooldown: 5000,
    chanceToStayStill: 0.3,
    chaseSpeed: 75,
    normalSpeed: 30,
    detectionRange: 150,
    hitRange: 20,
    dashChance: 0.01,
    rangedAttackChance: 0.01,
    minDashCooldown: 2000,
    maxDashCooldown: 10000,
    dashSpeed: 5000,
    navigationDirectionThreshold: 5,
};
