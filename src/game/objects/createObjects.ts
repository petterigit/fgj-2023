import { Resources } from 'game/resources';
import { createDuck } from 'game/objects/duck';
import { Actor } from 'excalibur';

/**
 * Create game objects.
 * Add the game objects to the game.
 * Give the objects properties in relation to the game if needed.
 * @param game Engine to create the objects in
 * @returns created game objects
 */

export const createObjects = (
    resources: Resources
): GameObjects => {
    const gameObjects: GameObjects = 
    
    {"duck": createDuck(resources)};






    return gameObjects;
};

type actorNames = "duck"

export type GameObjects = Record<actorNames, Actor>;