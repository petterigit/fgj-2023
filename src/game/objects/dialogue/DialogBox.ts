import {
    ScreenElement,
    Vector,
    Text,
    Font,
    Color,
    Sprite,
    FontStyle,
    TextAlign,
    BaseAlign,
} from 'excalibur';
import { Resources } from 'game/types';
import { createNextButton } from '../ui-components/NextButton';

export const createDialogBox = (
    characterName: string,
    dialogs: string[],
    onEnd: () => void,
    characterSprite: Sprite,
    motiveSprite: Sprite,
    resources: Resources
) => {
    let textIndex = 0;

    const element = new ScreenElement({
        pos: new Vector(400, 800),
        scale: new Vector(1, 1),
        color: Color.LightGray,
        width: 1500,
        height: 600,
    });

    const name = new Text({
        text: characterName,
        font: new Font({
            size: 40,
            family: 'sans-serif',
            style: FontStyle.Normal,
            bold: true,
            textAlign: TextAlign.Left,
            baseAlign: BaseAlign.Alphabetic,
        }),
    });

    const dialogTexts = dialogs.map(
        text =>
            new Text({
                text: text,
                font: new Font({
                    size: 25,
                    family: 'sans-serif',
                    style: FontStyle.Oblique,
                    bold: false,
                    textAlign: TextAlign.Left,
                    baseAlign: BaseAlign.Top,
                }),
            })
    );

    /**
     * SET THESE WHEN YOU CHANGE SPRITE AND NOTHING SHOWS
     * Made for duck image :] (change the scale with correctly sized sprites)
     */
    const characterElement = new ScreenElement({
        pos: new Vector(550, -721),

        scale: new Vector(1.2, 1.2),
    });

    characterElement.graphics.use(characterSprite);

    const motiveElement = new ScreenElement({
        pos: new Vector(0, -660),
        scale: new Vector(1.1, 1.1),
    });

    motiveElement.graphics.use(motiveSprite);

    motiveElement.graphics.opacity = 0;

    const characterNameContainer = new ScreenElement({
        pos: new Vector(30, 55),
    });

    characterNameContainer.graphics.use(name);

    const dialogTextContainer = new ScreenElement({
        pos: new Vector(30, 120),
    });

    dialogTextContainer.graphics.use(dialogTexts[0]);

    const nextButton = createNextButton(
        resources,
        () => {
            textIndex++;

            // Last text, show motive picture

            if (textIndex === dialogTexts.length - 1) {
                motiveElement.graphics.opacity = 1;
                characterElement.graphics.opacity = 0;
            }

            // End scene
            if (textIndex === dialogTexts.length) {
                // Just in case the dialog box wouldn't be destroyed after done..
                // No return on purpose to default the text
                onEnd();
                textIndex = 0;
            }

            dialogTextContainer.graphics.use(dialogTexts[textIndex]);
        },
        new Vector(1200, 75)
    );

    element.addChild(motiveElement);
    element.addChild(characterElement);
    element.addChild(characterNameContainer);
    element.addChild(dialogTextContainer);
    element.addChild(nextButton);

    return element;
};
