import { Loader } from 'excalibur';
import { Resources } from 'game/types';

/**
 * Creates loader for game assets. Further load configuration available as well.
 * @param props Assets that require a loader
 * @returns
 */
export const createLoader = (props: Resources) => {
    const { sounds, images } = props;

    /**
     * Loading assets
     */
    const resources = Object.values({ ...sounds, ...images });
    const loader = new Loader(resources);
    loader.suppressPlayButton = true;

    return loader;
};
