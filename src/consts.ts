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
};

export const PlayerDefaultStats = {
    health: 100,
    attack: 10,
    speed: 200,
};

export const EnemyLogic = {
    minStateChangeCooldown: 0,
    maxStateChangeCooldown: 5000,
    minAttackCooldown: 50,
    maxAttackCooldown: 5000,
    minWanderCooldown: 50,
    maxWanderCooldown: 5000,
    chanceToStayStill: 0.3,
    chaseSpeed: 75,
    normalSpeed: 30,
    detectionRange: 150,
    hitRange: 20,
};
