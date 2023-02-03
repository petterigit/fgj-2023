import { createGame } from './engine/game';
import { createObjects } from './objects/createObjects';
import { initGameEvents } from './events/gameEvents';
import { useDevUtils } from './devutils';
import { Game, GameProps } from './types';
import { createLoader } from './loaders/loaders';
import { createResources } from './resources';
import { createScenes } from './scenes/createScenes';
import { SceneKeys } from './scenes/gamescenes';

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

    const resources = createResources();

    const game: Game = createGame();

    const objects = createObjects(resources);

    const gameProps: GameProps = { game, objects, resources };

    initGameEvents(gameProps);

    const loader = createLoader(resources);

    if (import.meta.env.MODE === 'useDevUtils') {
        useDevUtils(gameProps);
    }

    const scenes = createScenes(objects);

    scenes.forEach(gameScene => {
        game.add(gameScene.key, gameScene.scene);
    })

    game.start(loader).then(() => game.goToScene(SceneKeys.Menu));
};
