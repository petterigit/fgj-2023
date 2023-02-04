import { ActorArgs, CollisionType, randomInRange, vec } from 'excalibur';
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
                pos: vec(
                    Math.floor(randomInRange(300, 1900)),
                    Math.floor(randomInRange(300, 1900))
                ),
            }),
            [
                props.objects.characters.Blondie,
                props.objects.characters.Teacher,
                props.objects.characters.Furry,
                props.objects.characters.Shroom,
            ],
            props.objects.characters.Bob,
            undefined,
            props,
            scene1Props,
            SceneKeys.Dialog2,
            sounds.gameMusicLoop
        ),
    };

    const dialog2 = {
        key: SceneKeys.Dialog2,
        scene: createDialogScene(
            [
                'Allow me to introduce myself, I am Bobby.',
                'A man of simple origins but with a steadfast resolve.',
                'I recently bore witness to a most distasteful spectacle.',
                'A fish man who saw fit to instill fear and trepidation in the hearts of innocent children.',
                'Such an act is wholly unacceptable and will not be tolerated under my watch.',
                "I am not intimidated by the fish man's physical prowess.",
                'I believe in the power of principle and justice.',
                'I shall stand in defiance of his unjust actions.',
                'I ensure that the children of this community are protected from his nefarious machinations.',
                'I am determined to bring the fish man to heel.',
                'And make him answer for his reprehensible behavior.',
                'He shall learn that one cannot use their strength to bully and oppress others with impunity.',
                'Therefore, I caution the fish man, for I am coming for him.',
                'And when I find him, he shall rue the day he ever thought to threaten the innocent.',
            ],
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
                pos: vec(
                    Math.floor(randomInRange(300, 1900)),
                    Math.floor(randomInRange(300, 1900))
                ),
            }),
            [
                props.objects.characters.Blondie,
                props.objects.characters.Tryhard,
                props.objects.characters.Furry,
                props.objects.characters.Shroom,
            ],
            props.objects.characters.Gobbo,
            undefined,
            props,
            scene2Props,
            SceneKeys.Dialog3,
            sounds.gameMusicLoop
        ),
    };

    const dialog3 = {
        key: SceneKeys.Dialog3,
        scene: createDialogScene(
            [
                "I'm the fish man, fierce and grand, Ruler of the seas and ocean land.",
                "A pearl was stolen, this I can't condone,  And I'll make sure the thief atones.",
                "Not cruel or mean, just upholding right,  Bringing balance to the ocean's sight.",
                "With strength and might, I'll make them see,  The error of their ways, just wait and see.",
                "So child, beware, I'm on your track,  And when I find you, you'll feel the smack!",
                "For thieving's wrong, and this you'll learn,  And regret will be your constant yearn.",
            ],
            props.resources.images.portraitKala.toSprite(),
            props.resources.images.characterBerry.toSprite(),
            SceneKeys.Level3,
            props.game,
            props.resources,
            sounds.gameMusicLoop
        ),
    };

    const level3 = {
        key: SceneKeys.Level3,
        scene: createLevelScene(
            props.objects.characters.Gobbo({
                ...playerDefaultProps,
                pos: vec(
                    Math.floor(randomInRange(300, 1900)),
                    Math.floor(randomInRange(300, 1900))
                ),
            }),
            [
                props.objects.characters.Blondie,
                props.objects.characters.Lavender,
                props.objects.characters.Furry,
                props.objects.characters.Shroom,
            ],
            props.objects.characters.Berry,
            undefined,
            props,
            scene1Props,
            SceneKeys.Dialog1,
            sounds.gameMusicLoop
        ),
    };

    return [menu, level1, dialog1, level2, dialog2, level3, dialog3];
};
