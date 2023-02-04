import { ActorArgs, CollisionType, Vector } from 'excalibur';
import { GameProps, GameScene } from 'game/types';
import { createDialogScene } from './dialogScene';
import { SceneKeys } from './gamescenes';
import { createLevelScene } from './levelScene';
import { createMenu } from './menu';

export const createScenes = (props: GameProps): GameScene[] => {
    const menu = createMenu(props);
    const playerDefaultProps : ActorArgs = {
        collisionType: CollisionType.Active
    };

    const dialog1 = {
        key: SceneKeys.Dialog1,
        scene: createDialogScene(
            ['Somebody took my lollypop', 'Time to take revenge'],
            props.resources.images.portraitBerry.toSprite(),
            props.resources.images.characterTryhard.toSprite(),
            SceneKeys.Level1,
            props.game,
            props.resources
        ),
    };

    const level1 = {
        key: SceneKeys.Level1,
        scene: createLevelScene(
            props.objects.characters.Berry({...playerDefaultProps, pos: new Vector(16*20, 16*20)}),
            [
                props.objects.characters.Blondie({ name: 'enemy' }),
                props.objects.characters.Bob({ name: 'enemy' }),
                props.objects.characters.Furry({ name: 'enemy' }),
                props.objects.characters.Shroom({ name: 'enemy' }),
            ],
            undefined,
            props
        ),
    };

    const dialog2 = {
        key: SceneKeys.Dialog2,
        scene: createDialogScene(
            ['The bad teacher did something bad', 'Time to take revenge'],
            props.resources.images.characterTryhard.toSprite(),
            props.resources.images.characterTeacher.toSprite(),
            SceneKeys.Level2,
            props.game,
            props.resources
        ),
    };

    const level2 = {
        key: SceneKeys.Level2,
        scene: createLevelScene(
            props.objects.characters.Berry({...playerDefaultProps, pos: new Vector(16*20, 16*20)}),
            [
                props.objects.characters.Blondie({ name: 'enemy' }),
                props.objects.characters.Bob({ name: 'enemy' }),
                props.objects.characters.Furry({ name: 'enemy' }),
                props.objects.characters.Shroom({ name: 'enemy' }),
            ],
            undefined,
            props
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
            props.resources
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
            props
        ),
    };

    return [menu, level1, dialog1, level2, dialog2, level3, dialog3];
};
