import { Sound } from 'excalibur';

import viiskauttaviis from 'assets/sounds/viiskauttaviis1.mp3';

/**
 * Type annotations for imported sounds
 */

/**
 * Create sounds. Probably same process for other static assets.
 * @returns Sound files how excalibur wants them
 */
export const createSounds = () => {
    const sounds = {
        viisKauttaViis: new Sound(viiskauttaviis),
    } as const;

    return sounds;
};
