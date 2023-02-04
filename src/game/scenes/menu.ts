import {
    BaseAlign,
    Color,
    Direction,
    Font,
    FontStyle,
    Label,
    Scene,
    TextAlign,
    Vector,
} from 'excalibur';
import { createNextButton } from 'game/objects/ui-components/NextButton';
import { GameProps, GameScene } from 'game/types';
import { SceneKeys } from './gamescenes';

export const createMenu = (props: GameProps) => {
    const scene: GameScene = {
        key: SceneKeys.Menu,
        scene: new Scene(),
    };

    scene.scene.add(props.objects.duck);

    const titleLabel = new Label({
        text: 'Root Causers\nBest game FGJ-2023',
        pos: new Vector(800, 300),
        font: new Font({
            size: 45,
            family: 'sans-serif',
            style: FontStyle.Oblique,
            bold: false,
            textAlign: TextAlign.Center,
            baseAlign: BaseAlign.Alphabetic,
            direction: Direction.LeftToRight,
            shadow: {
                blur: 2,
                offset: new Vector(3, 3),
                color: Color.Black,
            },
        }),
    });

    const startGameLabel = new Label({
        text: 'Play game',
        pos: new Vector(800, 700),
        font: new Font({
            size: 30,
            family: 'sans-serif',
            style: FontStyle.Normal,
            bold: false,
            textAlign: TextAlign.Center,
            baseAlign: BaseAlign.Alphabetic,
            direction: Direction.LeftToRight,
            shadow: {
                blur: 2,
                offset: new Vector(3, 3),
                color: Color.Black,
            },
        }),
    });

    scene.scene.add(titleLabel);
    scene.scene.add(startGameLabel);

    const nextButton = createNextButton(
        props.resources,
        props.game,
        SceneKeys.Level1
    );

    scene.scene.add(nextButton);

    return scene;
};
