/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Engine } from 'excalibur';
import { CreateAnimations, CreateSpriteSheets, Resources } from 'game/types';
import { createCharacters } from './characters';
import { createDuck } from './duck';
import { createHouse } from './environment/house';
import { createRocks } from './environment/rocks';
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
    spritesheets: CreateSpriteSheets,
    animations: CreateAnimations
) => {
    const duck = createDuck(resources);
    const characters = createCharacters(spritesheets, animations);
    const house = createHouse(spritesheets);
    const trees = createTrees(spritesheets);
    const rocks = createRocks(spritesheets);
    return { duck, characters, trees, rocks, house } as const;
};
