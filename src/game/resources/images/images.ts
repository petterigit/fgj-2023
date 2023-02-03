import { ImageSource } from 'excalibur';

import duckImage from 'assets/images/duck.jpg';
import forward from 'assets/images/forward.png';
import forwardActive from 'assets/images/forward-active.png';
import backward from 'assets/images/backward.png';
import backwardActive from 'assets/images/backward-active.png';

/**
 * Type annotations for imported images
 */
type ImageType =
    | 'duckImage'
    | 'forward'
    | 'forwardActive'
    | 'backward'
    | 'backwardActive';

export type ImageSources = { [I in ImageType]: ImageSource };

/**
 * Create images. Probably same process for other static assets.
 * @returns image files how excalibur wants them
 */
export const createImages = (): ImageSources => {
    const images: ImageSources = {
        duckImage: new ImageSource(duckImage),
        forward: new ImageSource(forward),
        forwardActive: new ImageSource(forwardActive),
        backward: new ImageSource(backward),
        backwardActive: new ImageSource(backwardActive),
    };

    return images;
};
