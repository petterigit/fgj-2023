
import { SpriteSheet } from 'excalibur';
import { Resources } from 'game/types';

export const createTreeBoy = (
    resources: Resources
) =>
    SpriteSheet.fromImageSourceWithSourceViews({
        image: resources.images.treeBoy,
        sourceViews: [
            {x:5, y:0, height: 64, width: 48},
            {x:55, y:0, height: 64, width: 48},
            {x:106, y:0, height: 64, width: 48},
            {x:156, y:0, height: 64, width: 48},
            {x:207, y:0, height: 64, width: 48},
        ],
        /*
        grid: {
            rows: 1,
            columns: 5,
            spriteHeight: 64,
            spriteWidth: 48,
        },
        spacing: {
            originOffset: {x:4, y: 0},
            margin:{x: 2, y: 0}
        },*/
    });
