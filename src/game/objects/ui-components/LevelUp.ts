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
        color: Color.LightGray,
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

    const nextLevelText = new Text({
        text: 'Go to next level',
        font: new Font({ size: 40 }),
    });

    const nextLevelTextContainer = new ScreenElement({
        pos: new Vector(50, 250),
    });

    nextLevelTextContainer.graphics.use(nextLevelText);
    element.addChild(nextLevelTextContainer);

    dialogTextContainer.graphics.use(text);
    element.addChild(dialogTextContainer);

    const nextElement = createNextButton(resources, onClick, vec(50, 300));
    element.addChild(nextElement);

    return element;
};
