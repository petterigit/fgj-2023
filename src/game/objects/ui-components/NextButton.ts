import { Engine, ScreenElement, Vector } from 'excalibur';
import { Resources } from 'game/resources';
import { SceneKeys } from 'game/scenes/gamescenes';

export const createNextButton = (
    resources: Resources,
    game: Engine,
    sceneToNavigate: SceneKeys
) => {
    const element = new ScreenElement({
        pos: new Vector(400, 800),
        scale: new Vector(1, 1),

        // pls remember these need to be set so the graphic actually has width & height that can be clicked at
        // idk what they should be we just scale a random thing
        // :]
        width: 500,
        height: 500,
    });

    element.graphics.use(resources.graphics.forward);
    element.graphics.add('idle', resources.graphics.forward);
    element.graphics.add('hover', resources.graphics.forwardActive);

    element.on('pointerup', () => {
        game.goToScene(sceneToNavigate);
    });

    element.on('pointerenter', () => {
        element.graphics.show('hover');
    });

    element.on('pointerleave', () => {
        element.graphics.show('idle');
    });

    return element;
};
