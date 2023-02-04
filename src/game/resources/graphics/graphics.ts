import { Sprite } from 'excalibur';
import { Resources } from 'game/types';

/**
 * Create images. Probably same process for other static assets.
 * @returns image files how excalibur wants them
 */
export const createGraphics = (images: Resources['images']) => {
    const graphics = {
        forward: new Sprite({ image: images.forward }),
        forwardActive: new Sprite({ image: images.forwardActive }),
        backward: new Sprite({ image: images.backward }),
        backwardActive: new Sprite({ image: images.backwardActive }),
        duck: new Sprite({ image: images.duckImage }),
    };

    return graphics;
};
