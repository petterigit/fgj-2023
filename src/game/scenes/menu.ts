import { Scene } from "excalibur"
import { GameObjects } from "game/objects/createObjects";
import {  GameScene } from "game/types";
import { SceneKeys } from "./gamescenes";

export const createMenu = (objects: GameObjects) => {
    const scene: GameScene = {
        key: SceneKeys.Menu,
        scene: new Scene(),
    }

    scene.scene.add(objects.duck);
    
    return scene;
}