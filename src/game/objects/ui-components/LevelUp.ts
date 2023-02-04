import { Color, Font, ScreenElement, Text, vec, Vector } from 'excalibur';
import { Resources } from 'game/types';
import { createNextButton } from './NextButton';

export const createLevelUpDialog = (
    pos: Vector,
    message: string,
    onClick: () => void,
    resources: Resources
) => {
    const element = new ScreenElement({
        pos: pos,
        color: Color.Rose,
        width: 1500,
        height: 500,
    });

    const text = new Text({
        text: message,
        font: new Font({ size: 40 }),
    });

    const dialogTextContainer = new ScreenElement({
        pos: new Vector(50, 150),
    });

    dialogTextContainer.graphics.use(text);
    element.addChild(dialogTextContainer);

    const nextElement = createNextButton(resources, onClick, vec(50, 150));
    element.addChild(nextElement);

    return element;
};
