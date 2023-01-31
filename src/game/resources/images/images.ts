import { ImageSource } from 'excalibur';

import niiloImage from '../../../assets/images/niilo.jpg';

/**
 * Type annotations for imported images
 */
type ImageType = 'niiloImage';

export type ImageSources = { [I in ImageType]: ImageSource };

/**
 * Create images. Probably same process for other static assets.
 * @returns image files how excalibur wants them
 */
export const createImages = (): ImageSources => {
    const images: ImageSources = {
        niiloImage: new ImageSource(niiloImage),
    };

    return images;
};
