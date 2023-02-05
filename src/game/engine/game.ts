import { Color, DisplayMode, Engine, Loader, Resolution } from 'excalibur';
import { GameCanvasID } from 'consts';
import { SceneKeys } from 'game/scenes/gamescenes';

/**
 * Initializes the game engine
 * Sets game resolution & other settings
 * */
export const createGame = () => {
    const game = new Game();

    /* game.goToScene can be used to change scenes *wink* *wink* */
    // game.start = (loader: Loader) => {
    //     return game.start(loader).then(() => game.goToScene(SceneKeys.Menu))
    // }
    return game;
};

class Game extends Engine {
    constructor() {
        super({
            displayMode: DisplayMode.FitScreen,
            resolution: Resolution.Standard,
            canvasElementId: GameCanvasID,
            backgroundColor: Color.fromHex('#ffffff'),
        });
    }

    public start(loader: Loader) {
        return super.start(loader).then(() => {
            this.goToScene(SceneKeys.Menu);
            // custom start-up
        });
    }
}
