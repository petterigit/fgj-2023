import { Sound } from 'excalibur';

import viiskauttaviis from 'assets/sounds/viiskauttaviis1.mp3';
import gameMusic from 'assets/sounds/FGJ2023-game-music.wav';
import menuMusic from 'assets/sounds/FGJ2023-main-menu.wav';
import hit1 from 'assets/sounds/combat/Hit001.wav';
import hit2 from 'assets/sounds/combat/Hit002.wav';
import hit3 from 'assets/sounds/combat/Hit003.wav';
import hit4 from 'assets/sounds/combat/Hit004.wav';

/**
 * Create sounds. Probably same process for other static assets.
 * @returns Sound files how excalibur wants them
 */

export const createSounds = () => {
    const gameMusicLoop = new Sound(gameMusic);
    gameMusicLoop.loop = true;
    gameMusicLoop.volume = 0.2;

    const menuMusicLoop = new Sound(menuMusic);
    menuMusicLoop.loop = true;
    menuMusicLoop.volume = 0.2;

    const sounds = {
        viisKauttaViis: new Sound(viiskauttaviis),
        hit1: new Sound(hit1),
        hit2: new Sound(hit2),
        hit3: new Sound(hit3),
        hit4: new Sound(hit4),
        gameMusicLoop: gameMusicLoop,
        menuMusicLoop: menuMusicLoop,
    } as const;

    return sounds;
};
