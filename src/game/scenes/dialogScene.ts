import { Sprite, Engine, Scene, Sound } from 'excalibur';
import { createDialogBox } from 'game/objects/dialogue/DialogBox';
import { Resources } from 'game/types';
import { SceneKeys } from './gamescenes';

export const createDialogScene = (
    dialogTexts: string[],
    dialogSprite: Sprite,
    dialogMotiveSprite: Sprite,
    nextScene: SceneKeys,
    game: Engine,
    resources: Resources,
    sound?: Sound
) => {
    const scene = new Scene();

    const dialogueBox = createDialogBox(
        dialogTexts,
        () => {
            game.goToScene(nextScene);
        },
        dialogSprite,
        dialogMotiveSprite,
        resources
    );

    scene.add(dialogueBox);

    if (sound) {
        scene.on('activate', () => {
            sound.play();
        });
        scene.on('deactivate', () => {
            sound.pause();
        });
    }

    return scene;
};
