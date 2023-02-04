import { SpriteSheet } from 'excalibur';
import { CharacterName, Resources } from 'game/types';

export const createCharacter = (
    characterName: CharacterName,
    resources: Resources
) =>
    SpriteSheet.fromImageSource({
        image: resources.images[`character${characterName}`],
        grid: {
            rows: 4,
            columns: 3,
            spriteHeight: 48,
            spriteWidth: 48,
        },
        spacing: {
            margin: {
                x: 0,
                y: 0,
            },
        },
    });
