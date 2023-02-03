import { Actor, Engine } from 'excalibur';
import { createDuck } from 'game/objects/duck';
import { Resources } from 'game/types';

/**
 * Create game objects.
 * Add the game objects to the game.
 * Give the objects properties in relation to the game if needed.
 * @param game Engine to create the objects in
 * @returns created game objects
 */

export const createObjects = (game: Engine, resources: Resources): Actor[] => {
    const duck = createDuck(resources);
    game.add(duck);
    return [duck];
};
