import { Sprite, Scene, Sound } from 'excalibur';
import { createDialogBox } from 'game/objects/dialogue/DialogBox';
import { GameProps } from 'game/types';
import { createLevel1, createLevel2, createLevel3 } from './createScenes';
import { SceneKeys } from './gamescenes';

export const createDialogScene = (
    characterName: string,
    dialogTexts: string[],
    dialogSprite: Sprite,
    dialogMotiveSprite: Sprite,
    nextScene: SceneKeys,
    gameProps: GameProps,
    sound?: Sound
) => {
    const scene = new Scene();

    const dialogueBox = createDialogBox(
        characterName,
        dialogTexts,
        () => {
            console.log(nextScene);
            switch (nextScene) {
                case SceneKeys.Level1: {
                    const level1 = createLevel1(gameProps);
                    gameProps.game.addScene(level1.key, level1.scene);
                    break;
                }
                case SceneKeys.Level2: {
                    console.log('create level2');
                    const level2 = createLevel2(gameProps);
                    gameProps.game.addScene(level2.key, level2.scene);
                    break;
                }
                case SceneKeys.Level3: {
                    const level3 = createLevel3(gameProps);
                    gameProps.game.addScene(level3.key, level3.scene);
                    break;
                }
            }
            gameProps.game.goToScene(nextScene);
        },
        dialogSprite,
        dialogMotiveSprite,
        gameProps.resources
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
