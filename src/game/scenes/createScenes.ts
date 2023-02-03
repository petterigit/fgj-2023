
import { GameObjects } from "game/objects/createObjects";
import {  GameScene } from "game/types";
import { createLevel1 } from "./level1";
import { createMenu } from "./menu";

export const createScenes = (objects: GameObjects): GameScene[] => {

    const menu = createMenu(objects);
    const level1 = createLevel1();


    return [
        menu,
        level1
    ]
}