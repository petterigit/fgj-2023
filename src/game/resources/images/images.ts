import { ImageSource } from 'excalibur';

import duckImage from 'assets/images/duck.jpg';
import branch1 from 'assets/tilesets/black_and_white_horror/branch1.png';
import branch2 from 'assets/tilesets/black_and_white_horror/branch2.png';
import brick1 from 'assets/tilesets/black_and_white_horror/brick1.png';
import bush1 from 'assets/tilesets/black_and_white_horror/bush1.png';

/**
 * Type annotations for imported images
 */
type ImageType = 'duckImage' | 'branch1'  | 'branch2' | 'brick1' | 'bush1';

export type ImageSources = { [I in ImageType]: ImageSource };

/**
 * Create images. Probably same process for other static assets.
 * @returns image files how excalibur wants them
 */
export const createImages = (): ImageSources => {
    const images: ImageSources = {
        duckImage: new ImageSource(duckImage),
        branch1: new ImageSource(branch1),
        branch2: new ImageSource(branch2),
        brick1: new ImageSource(brick1),
        bush1: new ImageSource(bush1),
    };

    return images;
};
