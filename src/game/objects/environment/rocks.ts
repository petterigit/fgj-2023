import { CreateSpriteSheets, RockType } from 'game/types';
import { Actor, CollisionType, Shape, Vector } from 'excalibur';

export const createRocks = (spritesheets: CreateSpriteSheets) => {
    const rocks: Record<string, (pos: Vector) => Actor> = {};
    const colliding: RockType[] = ['Rock2', 'Rock3', 'Rock5', 'Rock6'];
    Object.entries(spritesheets.rocks).forEach(([name, sprites]) => {
        rocks[name] = (pos: Vector) => {
            const collider = Shape.Box(20, 20);
            const hasCollision = colliding.includes(name as RockType);
            const rock = new Actor({
                name: name,
                pos: pos,
                collider: collider,
                collisionType: hasCollision
                    ? CollisionType.Fixed
                    : CollisionType.PreventCollision,
            });
            rock.graphics.use(sprites!);
            if (hasCollision) {
                rock.z = 32;
            }
            return rock;
        };
    });

    return rocks as Record<RockType, (pos: Vector) => Actor>;
};
