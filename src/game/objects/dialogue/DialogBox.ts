import { ScreenElement, Vector, Text, Font } from 'excalibur';
import { Resources } from 'game/types';
import { createNextButton } from '../ui-components/NextButton';

export const createDialogBox = (
    dialogs: string[],
    onEnd: () => void,
    resources: Resources
) => {
    let textIndex = 0;

    const element = new ScreenElement({
        pos: new Vector(400, 800),
        scale: new Vector(1, 1),
    });

    const dialogTexts = dialogs.map(
        text =>
            new Text({
                text: text,
                font: new Font({ size: 20 }),
            })
    );

    element.graphics.use(dialogTexts[0]);

    const nextButton = createNextButton(
        resources,
        () => {
            textIndex++;
            if (dialogTexts.length <= textIndex) {
                onEnd();
                // Just in case the dialog box wouldn't be destroyed after done..
                textIndex = 0;
                return;
            }
            element.graphics.use(dialogTexts[textIndex]);
        },
        new Vector(300, 0)
    );

    element.addChild(nextButton);

    return element;
};
