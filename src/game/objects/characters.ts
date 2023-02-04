import { CharacterName, CreateSpriteSheets } from "game/types";
import { Player } from './player/Player';
import { CharacterAnimationSpeed } from 'consts';
import { Animation, vec } from "excalibur";

export const createCharacters = (spritesheets: CreateSpriteSheets) => {
    const characters: Record<string, () => Player> = {};
    Object.entries(spritesheets.characters).forEach(([name, sprites]) => {
        const player = () =>
            new Player({
                scale: vec(0.5, 0.5),
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
