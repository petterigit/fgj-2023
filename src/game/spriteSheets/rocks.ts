import { SpriteSheet } from 'excalibur';
import { Resources } from 'game/types';

export const createRocks = (resources: Resources) =>
    SpriteSheet.fromImageSource({
        image: resources.images.rockSet,
        grid: {
            rows: 3,
            columns: 2,
            spriteHeight: 32,
            spriteWidth: 32,
        },
    });
