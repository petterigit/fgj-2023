import { Scene } from 'excalibur';
import { createNextButton } from 'game/objects/ui-components/NextButton';
import { GameProps, GameScene } from 'game/types';
import { SceneKeys } from './gamescenes';

export const createMenu = (props: GameProps) => {
    const scene: GameScene = {
        key: SceneKeys.Menu,
        scene: new Scene(),
    };

    scene.scene.add(props.objects.duck);

    const nextButton = createNextButton(
        props.resources,
        props.game,
        SceneKeys.Level1
    );

    scene.scene.add(nextButton);

    return scene;
};
