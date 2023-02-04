import { Animation, Engine } from 'excalibur';
import { Resources } from 'game/types';
import { createDuck } from './duck';
import { Player } from './player/Player';

/**
 * Create game objects.
 * Add the game objects to the game.
 * Give the objects properties in relation to the game if needed.
 * @param game Engine to create the objects in
 * @returns created game objects
 */

export const createObjects = (game: Engine, resources: Resources) => {
    const duck = createDuck(resources);
    const player = new Player({
        animations: {
            idle: new Animation({
                frames: [
                    {
                        graphic: resources.images.branch1.toSprite(),
                        duration: 1000,
                    },
                    {
                        graphic: resources.images.branch2.toSprite(),
                        duration: 1000,
                    },
                ],
            }),
            left: new Animation({
                frames: [
                    {
                        graphic: resources.images.pebble1.toSprite(),
                        duration: 1000,
                    },
                ],
            }),
            right: new Animation({
                frames: [
                    {
                        graphic: resources.images.brick1.toSprite(),
                        duration: 1000,
                    },
                ],
            }),
            up: new Animation({
                frames: [
                    {
                        graphic: resources.images.fire1.toSprite(),
                        duration: 1000,
                    },
                ],
            }),
            down: new Animation({
                frames: [
                    {
                        graphic: resources.images.flower1.toSprite(),
                        duration: 1000,
                    },
                ],
            }),
        },
    });

    game.add(duck);
    game.add(player);

    return { duck, player };
};
