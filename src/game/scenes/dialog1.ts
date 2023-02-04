import { Engine, Scene } from 'excalibur';
import { createDialogBox } from 'game/objects/dialogue/DialogBox';
import { GameScene, Resources } from 'game/types';
import { SceneKeys } from './gamescenes';

export const createDialog1 = (game: Engine, resources: Resources) => {
    const dialogScene = new Scene();

    const dialogueBox = createDialogBox(
        ['Somebody took my lollypop', 'It is time to take revenge'],
        () => {
            game.goToScene(SceneKeys.Level1);
        },
        resources.graphics.duck,
        resources
    );

    dialogScene.add(dialogueBox);

    const scene: GameScene = {
        key: SceneKeys.Dialog1,
        scene: dialogScene,
    };
    return scene;
};
