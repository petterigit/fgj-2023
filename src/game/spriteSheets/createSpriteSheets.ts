import { Resources } from 'game/types';
import { createCharacter } from './characters';
import { createCliffs } from './cliffs';
import { createBlood, createMelee } from './effects';
import { createTrees } from './forestTrees';
import { createGround } from './ground';

export const createSpriteSheets = (resources: Resources) => {
    const groundSheet = createGround(resources);
    const treesSheet = createTrees(resources);
    const cliffSheet = createCliffs(resources);
    const melee = createMelee(resources);
    const blood = createBlood(resources);
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
        cliff: cliffSheet,
        effects: {
            melee,
            blood,
        },
        trees: {
            Yellow1: treesSheet.getSprite(0, 0),
            Yellow2: treesSheet.getSprite(1, 0),
            Yellow3: treesSheet.getSprite(2, 0),
            Yellow4: treesSheet.getSprite(3, 0),
            Yellow5: treesSheet.getSprite(4, 0),
            Yellow6: treesSheet.getSprite(5, 0),
            Green1: treesSheet.getSprite(0, 2),
            Green2: treesSheet.getSprite(1, 2),
            Green3: treesSheet.getSprite(2, 2),
            Green4: treesSheet.getSprite(3, 2),
            Green5: treesSheet.getSprite(4, 2),
            Green6: treesSheet.getSprite(5, 2),
            Red1: treesSheet.getSprite(0, 1),
            Red2: treesSheet.getSprite(1, 1),
            Red3: treesSheet.getSprite(2, 1),
            Red4: treesSheet.getSprite(3, 1),
            Red5: treesSheet.getSprite(4, 1),
            Red6: treesSheet.getSprite(5, 1),
        },
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
