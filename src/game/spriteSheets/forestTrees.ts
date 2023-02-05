import { SpriteSheet } from 'excalibur';
import { Resources } from 'game/types';

export const createTrees = (resources: Resources) =>
    SpriteSheet.fromImageSource({
        image: resources.images.treeSet,
        grid: {
            rows: 3,
            columns: 6,
            spriteHeight: 110,
            spriteWidth: 69,
        },
    });
