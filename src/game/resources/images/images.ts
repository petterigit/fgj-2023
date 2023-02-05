import { ImageSource } from 'excalibur';

import duckImage from 'assets/images/duck.jpg';
import forward from 'assets/images/forward.png';
import forwardActive from 'assets/images/forward-active.png';
import backward from 'assets/images/backward.png';
import backwardActive from 'assets/images/backward-active.png';
import groundSet from 'assets/tilesets/Forest/Ground Tileset.png';
import treeSet from 'assets/tilesets/Forest/Trees.png';
import cliffSet from 'assets/tilesets/Forest/Cliff.png';
import rockSet from 'assets/tilesets/Forest/Rocks.png';
import character1 from 'assets/characters/Fantasy/Character_001.png';
import character2 from 'assets/characters/Fantasy/Character_002.png';
import character3 from 'assets/characters/Fantasy/Character_003.png';
import character4 from 'assets/characters/Fantasy/Character_004.png';
import character5 from 'assets/characters/Fantasy/Character_005.png';
import character6 from 'assets/characters/Fantasy/Character_006.png';
import character7 from 'assets/characters/Fantasy/Character_007.png';
import character8 from 'assets/characters/Fantasy/Character_008.png';
import character9 from 'assets/characters/Fantasy/Character_009.png';
import character10 from 'assets/characters/Fantasy/Character_010.png';
import treeBoy from 'assets/images/puupoju.png';
import berry from 'assets/images/berry.png';
import house from 'assets/images/talo.png';
import bob from 'assets/images/bobby.png';
import melee from 'assets/images/Melee/melee.png';
import dark from 'assets/images/dark.png';
import blood from 'assets/images/blood.png';
import portraitKala from 'assets/images/kala.png';
import berryMotive from 'assets/images/bad_bobby.png';
import fishManMotive from 'assets/images/bad_berry.png';
import bobbyMotive from 'assets/images/bad_fishman.png';

/**
 * Create images. Probably same process for other static assets.
 * @returns image files how excalibur wants them
 */
export const createImages = () => {
    const images = {
        duckImage: new ImageSource(duckImage),
        house: new ImageSource(house),
        forward: new ImageSource(forward),
        treeBoy: new ImageSource(treeBoy),
        forwardActive: new ImageSource(forwardActive),
        backward: new ImageSource(backward),
        backwardActive: new ImageSource(backwardActive),
        groundSet: new ImageSource(groundSet),
        cliffSet: new ImageSource(cliffSet),
        rockSet: new ImageSource(rockSet),
        treeSet: new ImageSource(treeSet),
        characterLavender: new ImageSource(character1),
        characterShroom: new ImageSource(character2),
        characterGobbo: new ImageSource(character3),
        characterFurry: new ImageSource(character4),
        characterTryhard: new ImageSource(character5),
        characterBob: new ImageSource(character6),
        characterAnimeProtagonist: new ImageSource(character7),
        characterBlondie: new ImageSource(character8),
        characterBerry: new ImageSource(character9),
        characterTeacher: new ImageSource(character10),
        portraitKala: new ImageSource(portraitKala),
        portraitBerry: new ImageSource(berry),
        portraitBob: new ImageSource(bob),
        melee: new ImageSource(melee),
        dark: new ImageSource(dark),
        blood: new ImageSource(blood),
        berryMotive: new ImageSource(berryMotive),
        fishManMotive: new ImageSource(fishManMotive),
        bobbyMotive: new ImageSource(bobbyMotive),
    } as const;

    return images;
};
