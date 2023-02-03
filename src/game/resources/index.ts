import { createImages } from './images/images';
import { createSounds } from 'game/resources/sounds/sounds';
import { createGraphics } from './graphics/graphics';

export const createResources = () => {
    const sounds = createSounds();
    const images = createImages();
    const graphics = createGraphics(images);

    const resources = {
        sounds: sounds,
        images: images,
        graphics: graphics,
    };

    return resources;
};
