
import { SpriteSheet } from 'excalibur';
import { Resources } from 'game/types';

export const createCliffs = (resources: Resources) =>
    SpriteSheet.fromImageSource({
        image: resources.images.cliffSet,
        grid: {
            rows: 5,
            columns: 11,
            spriteHeight: 24,
            spriteWidth: 24,
        },
    });
