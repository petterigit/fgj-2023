import { DisplayMode, Engine, Resolution } from 'excalibur';
import { gameCanvasID } from 'consts';

/**
 * Initializes the game engine
 * Sets game resolution & other settings
 * */
export const createGame = () => {
    const canvasElementId = gameCanvasID;

    const game = new Engine({
        displayMode: DisplayMode.FitScreen,
        resolution: Resolution.Standard,
        canvasElementId: canvasElementId,
    });

    return game;
};
