import { Engine } from 'excalibur';
import { Resources } from 'game/resources';
import { GameObjects } from 'game/types';
import { createDuck } from 'game/objects/duck';

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
    const duck = createDuck(resources);
    game.add(duck);
    return [duck];
};
