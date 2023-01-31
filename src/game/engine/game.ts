import { DisplayMode, Engine } from 'excalibur';
import { gameCanvasID } from 'consts';

/**
 * Initializes the game engine
 * Sets game resolution & other settings
 * */
export const createGame = () => {
    const displayMode = DisplayMode.FillContainer;
    const canvasElementId = gameCanvasID;

    const game = new Engine({
        displayMode: displayMode,
        canvasElementId: canvasElementId,
    });

    return game;
};
