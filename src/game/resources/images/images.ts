import { ImageSource } from 'excalibur';

import duckImage from 'assets/images/duck.jpg';
import forward from 'assets/images/forward.png';
import forwardActive from 'assets/images/forward-active.png';
import backward from 'assets/images/backward.png';
import backwardActive from 'assets/images/backward-active.png';
import groundSet from 'assets/tilesets/Forest/Ground Tileset.png';



/**
 * Create images. Probably same process for other static assets.
 * @returns image files how excalibur wants them
 */
export const createImages = () => {
    const images = {
        duckImage: new ImageSource(duckImage),
        forward: new ImageSource(forward),
        forwardActive: new ImageSource(forwardActive),
        backward: new ImageSource(backward),
        backwardActive: new ImageSource(backwardActive),
        groundSet: new ImageSource(groundSet),
    } as const;

    return images;
};
