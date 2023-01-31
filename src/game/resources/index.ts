import { createImages, ImageSources } from './images/images';
import { createSounds, Sounds } from 'game/resources/sounds/sounds';

export interface Resources {
    sounds: Sounds;
    images: ImageSources;
}

export const createResources = (): Resources => {
    const sounds: Sounds = createSounds();
    const images: ImageSources = createImages();

    const resources: Resources = { sounds: sounds, images: images };

    return resources;
};
