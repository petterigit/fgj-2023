import { Actor, CollisionType, Vector } from 'excalibur';
import { CreateSpriteSheets } from 'game/types';

export const createHouse = (spritesheets: CreateSpriteSheets) => (pos: Vector) => {

    const house = new Actor({
        name: 'house', // optionally assign a name
        pos: pos,
        width: 80,
        height: 80,
        collisionType: CollisionType.Fixed
    });

    const houseSprite = spritesheets.house.getSprite(0, 0)!;
    house.graphics.use(houseSprite);
    return house;
};
