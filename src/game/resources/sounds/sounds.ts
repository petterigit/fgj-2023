import { Sound } from 'excalibur';

import viiskauttaviis from 'assets/sounds/viiskauttaviis1.mp3';
import gameMusic from 'assets/sounds/FGJ2023-game-music.wav';
import menuMusic from 'assets/sounds/FGJ2023-main-menu.wav';

/**
 * Create sounds. Probably same process for other static assets.
 * @returns Sound files how excalibur wants them
 */

export const createSounds = () => {
    const gameMusicLoop = new Sound(gameMusic);
    gameMusicLoop.loop = true;

    const menuMusicLoop = new Sound(menuMusic);
    menuMusicLoop.loop = true;

    const sounds = {
        viisKauttaViis: new Sound(viiskauttaviis),
        gameMusicLoop: gameMusicLoop,
        menuMusicLoop: menuMusicLoop,
    } as const;

    return sounds;
};
