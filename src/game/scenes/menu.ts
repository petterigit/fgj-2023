import {
    BaseAlign,
    Color,
    Direction,
    Font,
    FontStyle,
    Label,
    Scene,
    ScreenElement,
    Sound,
    TextAlign,
    vec,
    Vector,
} from 'excalibur';
import { createNextButton } from 'game/objects/ui-components/NextButton';
import { GameProps, GameScene } from 'game/types';
import { createDialog1 } from './createScenes';
import { SceneKeys } from './gamescenes';

export const createMenu = (props: GameProps, sound?: Sound) => {
    const { canvasHeight, canvasWidth } = props.game;

    const scene: GameScene = {
        key: SceneKeys.Menu,
        scene: new Scene(),
    };

    const background = new ScreenElement();
    const sprite = props.resources.images.dark.toSprite();

    const width = 1024;
    const height = 1024;
    const scaleX = canvasWidth / width;
    const scaleY = canvasHeight / height;

    sprite.scale = vec(scaleX, scaleY);
    background.graphics.add(sprite);
    scene.scene.add(background);

    const titleLabel = new Label({
        text: 'Root Causers\nBest game FGJ-2023',
        pos: new Vector(1020, 460),
        font: new Font({
            size: 75,
            family: 'sans-serif',
            style: FontStyle.Oblique,
            bold: true,
            textAlign: TextAlign.Center,
            baseAlign: BaseAlign.Alphabetic,
            direction: Direction.LeftToRight,
            color: Color.White,
            shadow: {
                blur: 10,
                offset: new Vector(10, 10),
                color: Color.Black,
            },
        }),
    });

    const startGameLabel = new Label({
        text: 'Play game',
        pos: new Vector(795, 780),
        font: new Font({
            size: 30,
            family: 'sans-serif',
            style: FontStyle.Normal,
            bold: false,
            textAlign: TextAlign.Center,
            baseAlign: BaseAlign.Alphabetic,
            direction: Direction.LeftToRight,
            lineWidth: 100,
            shadow: {
                blur: 2,
                offset: new Vector(3, 3),
                color: Color.Black,
            },
        }),
    });

    const keysLabel = new Label({
        text: 'Esc returns to menu\nWASD/Arrows to move\nSpace to attack\nE to throw rock\nShift to dash',
        pos: new Vector(150, 20),
        font: new Font({
            size: 20,
            padding: 10,
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

    const keysBackdrop = new ScreenElement({
        pos: new Vector(1000, 825),
        width: 300,
        height: 125,
        color: Color.DarkGray,
    });

    keysBackdrop.addChild(keysLabel);

    scene.scene.add(titleLabel);
    scene.scene.add(startGameLabel);
    scene.scene.add(keysBackdrop);

    const nextButton = createNextButton(
        props.resources,
        () => {
            const dialog1 = createDialog1(props);
            props.game.addScene(dialog1.key, dialog1.scene);
            props.game.goToScene(SceneKeys.Dialog1);
        },
        new Vector(700, 800)
    );

    scene.scene.add(nextButton);

    if (sound) {
        scene.scene.on('activate', () => {
            sound.play();
        });
        scene.scene.on('deactivate', () => {
            sound.pause();
        });
    }

    return scene;
};
