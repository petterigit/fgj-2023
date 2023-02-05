import { Loader } from 'excalibur';
import { AudioManager } from 'game/resources/sounds/audiomanager';
import { Resources } from 'game/types';

/**
 * Creates loader for game assets. Further load configuration available as well.
 * @param props Assets that require a loader
 * @returns
 */
export const createLoader = (props: Resources) => {
    const { images } = props;
    const sounds = AudioManager.getSounds();

    /**
     * Loading assets
     */
    const resources = Object.values({ ...sounds, ...images });
    const loader = new Loader(resources);

    return loader;
};
