import { Scene } from "excalibur"
import { GameScene } from "game/types";
import { SceneKeys } from "./gamescenes";

export const createLevel1 = () => {
    const scene: GameScene = {
        key: SceneKeys.Level1,
        scene: new Scene(),
    }
    return scene;
}