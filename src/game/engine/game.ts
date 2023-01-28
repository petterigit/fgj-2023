import { DisplayMode, Engine } from 'excalibur';
import { gameCanvasID } from '../../consts';

export const createGame = () => {
    const displayMode = DisplayMode.FillScreen;
    const canvasElementId = gameCanvasID;

    const game = new Engine({
        displayMode: displayMode,
        canvasElementId: canvasElementId,
    });

    return game;
};
