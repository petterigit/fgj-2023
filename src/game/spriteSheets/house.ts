import { SpriteSheet } from 'excalibur';
import { Resources } from 'game/types';

export const createHouse = (resources: Resources) =>
    SpriteSheet.fromImageSource({
        image: resources.images.house,
        grid: {
            rows: 1,
            columns: 1,
            spriteHeight: 96,
            spriteWidth: 96,
        },
    });
