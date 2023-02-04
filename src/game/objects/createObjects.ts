/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Engine } from 'excalibur';
import { CreateSpriteSheets, Resources } from 'game/types';
import { createCharacters } from './characters';
import { createDuck } from './duck';
import { createTrees } from './environment/trees';

/**
 * Create game objects.
 * Add the game objects to the game.
 * Give the objects properties in relation to the game if needed.
 * @param game Engine to create the objects in
 * @returns created game objects
 */


export const createObjects = (
    _game: Engine,
    resources: Resources,
    spritesheets: CreateSpriteSheets
) => {
    const duck = createDuck(resources);
    const characters = createCharacters(spritesheets);
    const trees = createTrees(spritesheets);
    return { duck, characters, trees } as const;
};

