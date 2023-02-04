import { CreateSpriteSheets, TreeType } from "game/types";
import { Actor, CollisionType, Shape, Vector } from "excalibur";

export const createTrees = (spritesheets: CreateSpriteSheets) => {
    const trees: Record<string, (pos: Vector) => Actor> = {};
    Object.entries(spritesheets.trees).forEach(([name, sprites]) => {
        trees[name] = (pos: Vector) => {
            const collider = Shape.Box(20, 20);
            collider.offset= new Vector(0,40);
            const tree = new Actor(
                {
                    name: name,
                    pos: pos,
                    collider: collider,
                    collisionType: CollisionType.Fixed
                })
            tree.graphics.use(sprites!)
            return tree;

        }

    });

    return trees as Record<TreeType, (pos: Vector) => Actor>;
}
