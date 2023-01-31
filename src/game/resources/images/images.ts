import { ImageSource } from 'excalibur';

import duckImage from 'assets/images/duck.jpg';

/**
 * Type annotations for imported images
 */
type ImageType = 'duckImage';

export type ImageSources = { [I in ImageType]: ImageSource };

/**
 * Create images. Probably same process for other static assets.
 * @returns image files how excalibur wants them
 */
export const createImages = (): ImageSources => {
    const images: ImageSources = {
        duckImage: new ImageSource(duckImage),
    };

    return images;
};
