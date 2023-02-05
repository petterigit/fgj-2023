import { createGame } from './engine/game';
import { createObjects } from './objects/createObjects';
import { initGameEvents } from './events/gameEvents';
import { useDevUtils } from './devutils';
import { createLoader } from './loaders/loaders';
import { createResources } from './resources';
import { createSpriteSheets } from './spriteSheets/createSpriteSheets';
import { UseDevUtils } from 'consts';
import { SceneKeys } from './scenes/gamescenes';
import { createAnimations } from './animations/createAnimations';
import { createMenu } from './scenes/menu';
import { AudioManager } from './resources/sounds/audiomanager';
//import { PostProcessor } from './postProcessor';

/**
 * Creates the game, adds game objects to the game, loads assets, toggles dev utils for the game, and finally, starts the game
 *
 * Creating a game requires:
 * @game Engine
 * @resources Game assets
 * @objects Game objects
 *
 * @events Events that objects have
 *
 * @loaders Are used to download assets beforehand for game to use
 * In addition, this allows for dev mode that toggles dev settings for game & game objects
 *
 */
export const initGame = () => {
    const game = createGame();
    const resources = createResources();
    const spriteSheets = createSpriteSheets(resources);
    const animations = createAnimations(spriteSheets);
    const objects = createObjects(game, resources, spriteSheets, animations);

    const gameProps = { game, objects, resources, spriteSheets, animations };

    initGameEvents(gameProps);

    const loader = createLoader(resources);

    if (import.meta.env.MODE === UseDevUtils) {
        useDevUtils(gameProps);
    }

    const menu = createMenu(gameProps, AudioManager.getSounds().menuMusicLoop);
    game.addScene(menu.key, menu.scene);

    // game.graphicsContext.addPostProcessor(new PostProcessor());
    /* game.goToScene can be used to change scenes *wink* *wink* */
    game.start(loader).then(() => game.goToScene(SceneKeys.Menu));
};
