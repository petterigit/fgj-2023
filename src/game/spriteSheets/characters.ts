import { SpriteSheet } from 'excalibur';
import { CharacterName, Resources } from 'game/types';

export const createCharacter = (
    characterName: CharacterName,
    resources: Resources
) =>
    SpriteSheet.fromImageSource({
        image: resources.images[`character${characterName}`],
        grid: {
            rows: 3,
            columns: 4,
            spriteHeight: 32,
            spriteWidth: 32,
        },
    });
