import { createImages, ImageSources } from './images/images';
import { createSounds, Sounds } from 'game/resources/sounds/sounds';
import { createGraphics, GraphicSources } from './graphics/graphics';

export interface Resources {
    sounds: Sounds;
    images: ImageSources;
    graphics: GraphicSources;
}

export const createResources = (): Resources => {
    const sounds: Sounds = createSounds();
    const images: ImageSources = createImages();
    const graphics: GraphicSources = createGraphics(images);

    const resources: Resources = {
        sounds: sounds,
        images: images,
        graphics: graphics,
    };

    return resources;
};
