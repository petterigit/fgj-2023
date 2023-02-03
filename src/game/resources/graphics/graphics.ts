import { Graphic, Sprite } from 'excalibur';
import { Resources } from 'game/types';

type GraphicType = 'forward' | 'forwardActive' | 'backward' | 'backwardActive';

export type GraphicSources = { [I in GraphicType]: Graphic };

/**
 * Create images. Probably same process for other static assets.
 * @returns image files how excalibur wants them
 */
export const createGraphics = (images: Resources['images']): GraphicSources => {
    const graphics: GraphicSources = {
        forward: new Sprite({ image: images.forward }),
        forwardActive: new Sprite({ image: images.forwardActive }),
        backward: new Sprite({ image: images.backward }),
        backwardActive: new Sprite({ image: images.backwardActive }),
    };

    return graphics;
};
