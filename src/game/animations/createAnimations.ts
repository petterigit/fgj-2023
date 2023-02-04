/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Animation, AnimationStrategy } from 'excalibur';
import { CreateSpriteSheets } from 'game/types';

export const createAnimations = (spritesheets: CreateSpriteSheets) => {
    return {
        melee: () =>
            new Animation({
                frames: [
                    {
                        graphic: spritesheets.effects.melee.getSprite(0, 0)!,
                        duration: 20,
                    },
                    {
                        graphic: spritesheets.effects.melee.getSprite(0, 1)!,
                        duration: 100,
                    },
                    {
                        graphic: spritesheets.effects.melee.getSprite(0, 2)!,
                        duration: 50,
                    },
                    {
                        graphic: spritesheets.effects.melee.getSprite(0, 3)!,
                        duration: 20,
                    },
                    {
                        graphic: spritesheets.effects.melee.getSprite(0, 4)!,
                        duration: 20,
                    },
                ],
                strategy: AnimationStrategy.End,
            }),
        blood: () =>
            new Animation({
                frames: new Array(24).fill(0).map((_, i) => ({
                    graphic: spritesheets.effects.blood.getSprite(
                        i % 6,
                        Math.floor(i / 6)
                    )!,
                    duration: 20,
                })),
                strategy: AnimationStrategy.End,
            }),
    } as const;
};
