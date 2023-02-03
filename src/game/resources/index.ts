import { createImages } from './images/images';
import { createSounds } from 'game/resources/sounds/sounds';

export const createResources = () => {
    const sounds = createSounds();
    const images = createImages();

    const resources = { sounds: sounds, images: images };

    return resources;
};
