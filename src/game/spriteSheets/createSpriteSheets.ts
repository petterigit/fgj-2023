import { Resources } from 'game/types';
import { createCharacter } from './characters';
import { createGround } from './ground';

export const createSpriteSheets = (resources: Resources) => {
    const groundSheet = createGround(resources);
    const Lavender = createCharacter('Lavender', resources);
    const Shroom = createCharacter('Shroom', resources);
    const Gobbo = createCharacter('Gobbo', resources);
    const Furry = createCharacter('Furry', resources);
    const Tryhard = createCharacter('Tryhard', resources);
    const Bob = createCharacter('Bob', resources);
    const AnimeProtagonist = createCharacter('AnimeProtagonist', resources);
    const Blondie = createCharacter('Blondie', resources);
    const Berry = createCharacter('Berry', resources);
    const Teacher = createCharacter('Teacher', resources);
    return {
        ground: groundSheet,
        characters: {
            Lavender,
            Shroom,
            Gobbo,
            Furry,
            Tryhard,
            Bob,
            AnimeProtagonist,
            Blondie,
            Berry,
            Teacher,
        },
    } as const;
};
