import { TreeBoyAnimationSpeed } from 'consts';
import {
    Actor,
    Animation,
    CollisionType,
    range,
    Shape,
    Vector,
} from 'excalibur';
import { CreateSpriteSheets } from 'game/types';

export const createTreeBoy =
    (spritesheets: CreateSpriteSheets) => (pos: Vector) => {
        const anim = Animation.fromSpriteSheet(
            spritesheets.treeBoy,
            range(0, 4),
            TreeBoyAnimationSpeed
        );
        const collider = Shape.Box(48 / 2, 48 / 2);
        collider.offset = new Vector(0, 16);
        const treeBoy = new Actor({
            name: 'treeboy', // optionally assign a name
            pos: pos,
            scale: new Vector(0.5, 0.5),
            collider: collider,
            collisionType: CollisionType.Fixed,
        });
        treeBoy.graphics.use(anim);

        return treeBoy;
    };
