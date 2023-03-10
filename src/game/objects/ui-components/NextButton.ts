import { ScreenElement, Vector } from 'excalibur';
import { Resources } from 'game/types';

export const createNextButton = (
    resources: Resources,
    onClick: () => void,
    pos: Vector
) => {
    const element = new ScreenElement({
        pos: pos,
        scale: new Vector(1, 1),

        // pls remember these need to be set so the graphic actually has width & height that can be clicked at
        // idk what they should be we just scale a random thing
        // :]
        width: 300,
        height: 200,
    });

    element.graphics.use(resources.graphics.forward);
    element.graphics.add('idle', resources.graphics.forward);
    element.graphics.add('hover', resources.graphics.forwardActive);

    element.on('pointerup', () => {
        onClick();
    });

    element.on('pointerenter', () => {
        element.graphics.show('hover');
    });

    element.on('pointerleave', () => {
        element.graphics.show('idle');
    });

    return element;
};
