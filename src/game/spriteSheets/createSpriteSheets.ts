import { Resources } from 'game/types';
import { createCharacter } from './characters';
import { createGround } from './ground';

export const createSpriteSheets = (resources: Resources) => {
    const groundSheet = createGround(resources);
    const lavender = createCharacter('Lavender', resources);
    const shroom = createCharacter('Shroom', resources);
    const gobbo = createCharacter('Gobbo', resources);
    const furry = createCharacter('Furry', resources);
    const tryhard = createCharacter('Tryhard', resources);
    const bob = createCharacter('Bob', resources);
    const animeProtagonist = createCharacter('AnimeProtagonist', resources);
    const blondie = createCharacter('Blondie', resources);
    const berry = createCharacter('Berry', resources);
    const teacher = createCharacter('Teacher', resources);
    return {
        ground: groundSheet,
        characters: {
            lavender,
            shroom,
            gobbo,
            furry,
            tryhard,
            bob,
            animeProtagonist,
            blondie,
            berry,
            teacher,
        },
    };
};
