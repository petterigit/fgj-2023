import { SpriteSheet } from 'excalibur';
import { Resources } from 'game/types';

export const createMelee = (resources: Resources) =>
    SpriteSheet.fromImageSource({
        image: resources.images.melee,
        grid: {
            rows: 5,
            columns: 1,
            spriteHeight: 32,
            spriteWidth: 35,
        },
    });

export const createBlood = (resources: Resources) =>
    SpriteSheet.fromImageSource({
        image: resources.images.blood,
        grid: {
            rows: 4,
            columns: 6,
            spriteHeight: 100,
            spriteWidth: 100,
        },
    });
