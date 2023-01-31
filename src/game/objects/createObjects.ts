import { Engine } from 'excalibur';
import { Resources } from '../resources';
import { GameObjects } from '../types';
import { createNiilo } from './niilo';

/**
 * Create game objects.
 * Add the game objects to the game.
 * Give the objects properties in relation to the game if needed.
 * @param game Engine to create the objects in
 * @returns created game objects
 */

export const createObjects = (
    game: Engine,
    resources: Resources
): GameObjects => {
    const niilo = createNiilo(resources);
    game.add(niilo);
    return [niilo];
};
