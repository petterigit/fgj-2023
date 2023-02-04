import { Actor } from 'excalibur';
import { GameProps, GameScene } from 'game/types';
import { createDialogScene } from './dialogScene';
import { SceneKeys } from './gamescenes';
import { createLevelScene } from './levelScene';
import { createMenu } from './menu';

export const createScenes = (props: GameProps): GameScene[] => {
    const menu = createMenu(props);

    const dialog1 = {
        key: SceneKeys.Dialog1,
        scene: createDialogScene(
            ['Somebody took my lollypop', 'Time to take revenge'],
            props.resources.graphics.duck,
            props.resources.graphics.duck,
            SceneKeys.Level1,
            props.game,
            props.resources
        ),
    };

    const level1 = {
        key: SceneKeys.Level1,
        scene: createLevelScene(new Actor(), undefined, undefined, props),
    };

    return [menu, level1, dialog1];
};
