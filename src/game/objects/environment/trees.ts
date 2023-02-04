import { CreateSpriteSheets, TreeType } from "game/types";
import { Player } from './player/Player';
import { Actor, Vector } from "excalibur";

export const createTrees = (spritesheets: CreateSpriteSheets) => {
    const trees: Record<string, (pos: Vector) => Player> = {};
    Object.entries(spritesheets.trees).forEach(([name, sprites]) => {
        trees[name] = (pos: Vector) => {
            const tree = new Actor({name: name,pos: pos, width:20, height:20})
            tree.graphics.use(sprites!)
            return tree;
        }

    });

    return trees as Record<TreeType, (pos: Vector) => Actor>;
}
