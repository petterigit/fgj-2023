/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CharacterAnimationSpeed } from 'consts';
import { Animation, Engine } from 'excalibur';
import { createSpriteSheets } from 'game/spriteSheets/createSpriteSheets';
import { CharacterName, Resources } from 'game/types';
import { createDuck } from './duck';
import { Player } from './player/Player';

/**
 * Create game objects.
 * Add the game objects to the game.
 * Give the objects properties in relation to the game if needed.
 * @param game Engine to create the objects in
 * @returns created game objects
 */

type CreateSpriteSheets = ReturnType<typeof createSpriteSheets>;

export const createObjects = (
    _game: Engine,
    resources: Resources,
    spritesheets: CreateSpriteSheets
) => {
    const duck = createDuck(resources);
    const characters = createCharacters(spritesheets);
    return { duck, characters } as const;
};

const createCharacters = (spritesheets: CreateSpriteSheets) => {
    const characters: Record<string, () => Player> = {};
    Object.entries(spritesheets.characters).forEach(([name, sprites]) => {
        const player = () =>
            new Player({
                animations: {
                    idle: new Animation({
                        frames: [
                            {
                                graphic: sprites.getSprite(1, 0)!,
                                duration: CharacterAnimationSpeed,
                            },
                        ],
                    }),
                    left: new Animation({
                        frames: [
                            {
                                graphic: sprites.getSprite(1, 1)!,
                                duration: CharacterAnimationSpeed,
                            },
                            {
                                graphic: sprites.getSprite(0, 1)!,
                                duration: CharacterAnimationSpeed,
                            },
                            {
                                graphic: sprites.getSprite(1, 1)!,
                                duration: CharacterAnimationSpeed,
                            },
                            {
                                graphic: sprites.getSprite(2, 1)!,
                                duration: CharacterAnimationSpeed,
                            },
                        ],
                    }),
                    right: new Animation({
                        frames: [
                            {
                                graphic: sprites.getSprite(1, 2)!,
                                duration: CharacterAnimationSpeed,
                            },
                            {
                                graphic: sprites.getSprite(0, 2)!,
                                duration: CharacterAnimationSpeed,
                            },
                            {
                                graphic: sprites.getSprite(1, 2)!,
                                duration: CharacterAnimationSpeed,
                            },
                            {
                                graphic: sprites.getSprite(2, 2)!,
                                duration: CharacterAnimationSpeed,
                            },
                        ],
                    }),
                    up: new Animation({
                        frames: [
                            {
                                graphic: sprites.getSprite(1, 3)!,
                                duration: CharacterAnimationSpeed,
                            },
                            {
                                graphic: sprites.getSprite(0, 3)!,
                                duration: CharacterAnimationSpeed,
                            },
                            {
                                graphic: sprites.getSprite(1, 3)!,
                                duration: CharacterAnimationSpeed,
                            },
                            {
                                graphic: sprites.getSprite(2, 3)!,
                                duration: CharacterAnimationSpeed,
                            },
                        ],
                    }),
                    down: new Animation({
                        frames: [
                            {
                                graphic: sprites.getSprite(1, 0)!,
                                duration: CharacterAnimationSpeed,
                            },
                            {
                                graphic: sprites.getSprite(0, 0)!,
                                duration: CharacterAnimationSpeed,
                            },
                            {
                                graphic: sprites.getSprite(1, 0)!,
                                duration: CharacterAnimationSpeed,
                            },
                            {
                                graphic: sprites.getSprite(2, 0)!,
                                duration: CharacterAnimationSpeed,
                            },
                        ],
                    }),
                },
            });

        characters[name] = player;
    });

    return characters as Record<CharacterName, () => Player>;
};
