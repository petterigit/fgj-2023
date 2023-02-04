import { SpriteSheet } from 'excalibur';
import { Resources } from 'game/types';

export const createGround = (resources: Resources) =>
    SpriteSheet.fromImageSource({
        image: resources.images.groundSet,
        grid: {
            rows: 15,
            columns: 22,
            spriteHeight: 16,
            spriteWidth: 16,
        },
    });
