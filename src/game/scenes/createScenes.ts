import { ActorArgs, CollisionType, Vector } from 'excalibur';
import { AudioManager } from 'game/resources/sounds/audiomanager';
import { GameProps, GameScene } from 'game/types';
import {
    Scenario1PropertiesGenerator,
    Scenario2PropertiesGenerator,
} from 'scenes/sceneProperties';
import { createDialogScene } from './dialogScene';
import { SceneKeys } from './gamescenes';
import { createLevelScene } from './levelScene';
import { createMenu } from './menu';

export const createScenes = (props: GameProps): GameScene[] => {
    const sounds = AudioManager.getSounds();

    const menu = createMenu(props, sounds.menuMusicLoop);
    const playerDefaultProps: ActorArgs = {
        collisionType: CollisionType.Active,
    };

    const dialog1 = {
        key: SceneKeys.Dialog1,
        scene: createDialogScene(
            [
                "I can't believe it, just a few moments ago I was enjoying my lollipop in the park.",
                'Then a stranger came and took it away from me, just like that.',
                "I'm so angry, I feel violated and frustrated.",
                'At that moment, I swore to myself...',
                'I swore that I would never let anyone treat me like that again.',
                "I won't stand here and do nothing.",
                "I won't let this stranger get away with what they did.",
                "I won't let them treat me with disrespect and steal what's rightfully mine.",
                "I'm going to get my lollipop back.",
                "I'm going to chase after that stranger and make them pay for what they did to me.",
                "I won't let them bully me or think that they can take advantage of me.",
                "I'm not a weak little kid anymore, I'm brave and determined.",
                "So watch out, stranger, because I'm coming for you.",
                "And when I find you, you'll regret ever taking my lollipop.",
            ],
            props.resources.images.portraitBerry.toSprite(),
            props.resources.images.characterTryhard.toSprite(),
            SceneKeys.Level1,
            props.game,
            props.resources,
            sounds.gameMusicLoop
        ),
    };

    const scene1Props = Scenario1PropertiesGenerator(props);
    const level1 = {
        key: SceneKeys.Level1,
        scene: createLevelScene(
            props.objects.characters.Berry({
                ...playerDefaultProps,
                pos: new Vector(16 * 20, 16 * 20),
            }),
            [
                props.objects.characters.Blondie({ name: 'enemy' }),
                props.objects.characters.Bob({ name: 'enemy' }),
                props.objects.characters.Furry({ name: 'enemy' }),
                props.objects.characters.Shroom({ name: 'enemy' }),
            ],
            undefined,
            props,
            scene1Props,
            sounds.gameMusicLoop
        ),
    };

    const dialog2 = {
        key: SceneKeys.Dialog2,
        scene: createDialogScene(
            ['The bad teacher did something bad', 'Time to take revenge'],
            props.resources.images.portraitBob.toSprite(),
            props.resources.images.characterTeacher.toSprite(),
            SceneKeys.Level2,
            props.game,
            props.resources,
            sounds.gameMusicLoop
        ),
    };

    const scene2Props = Scenario2PropertiesGenerator(props);
    const level2 = {
        key: SceneKeys.Level2,
        scene: createLevelScene(
            props.objects.characters.Bob({
                ...playerDefaultProps,
                pos: new Vector(16 * 20, 16 * 20),
            }),
            [
                props.objects.characters.Blondie({ name: 'enemy' }),
                props.objects.characters.Bob({ name: 'enemy' }),
                props.objects.characters.Furry({ name: 'enemy' }),
                props.objects.characters.Shroom({ name: 'enemy' }),
            ],
            undefined,
            props,
            scene2Props,
            sounds.gameMusicLoop
        ),
    };

    const dialog3 = {
        key: SceneKeys.Dialog3,
        scene: createDialogScene(
            ['The bad child did something bad', 'Time to take revenge'],
            props.resources.images.characterTeacher.toSprite(),
            props.resources.images.characterBerry.toSprite(),
            SceneKeys.Level1,
            props.game,
            props.resources,
            sounds.gameMusicLoop
        ),
    };

    const level3 = {
        key: SceneKeys.Level3,
        scene: createLevelScene(
            props.objects.characters.Berry(),
            [
                props.objects.characters.Blondie({ name: 'enemy' }),
                props.objects.characters.Bob({ name: 'enemy' }),
                props.objects.characters.Furry({ name: 'enemy' }),
                props.objects.characters.Shroom({ name: 'enemy' }),
            ],
            undefined,
            props,
            scene1Props,
            sounds.gameMusicLoop
        ),
    };

    return [menu, level1, dialog1, level2, dialog2, level3, dialog3];
};
