import { Sound } from 'excalibur';

import viiskauttaviis from 'assets/sounds/viiskauttaviis1.mp3';

/**
 * Type annotations for imported sounds
 */
type SoundType = 'viisKauttaViis';

export type Sounds = { [S in SoundType]: Sound };

/**
 * Create sounds. Probably same process for other static assets.
 * @returns Sound files how excalibur wants them
 */
export const createSounds = (): Sounds => {
    const sounds: Sounds = {
        viisKauttaViis: new Sound(viiskauttaviis),
    };

    return sounds;
};
