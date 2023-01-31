import { createGame } from './engine/game';
import { createObjects } from './objects/createObjects';
import { initGameEvents } from './events/gameEvents';
import { useDevUtils } from './devutils';
import { Game, GameObjects, GameProps } from './types';
import { createLoader } from './loaders/loaders';
import { createResources } from './resources';

/**
 * Creates the game, adds game objects to the game, loads assets, toggles dev utils for the game, and finally, starts the game
 */
export const initGame = () => {
    // Creating a game requires:

    // 1) Game - An engine that keeps everything going
    const game: Game = createGame();

    // 2) Static assets that can be used inside the game
    const resources = createResources();

    // 3) Game objects that are added to the game
    const objects: GameObjects = createObjects(game, resources);

    // These objects are used through this variable
    const gameProps: GameProps = { game, objects, resources };

    // Game events need to be configured after everything is set
    initGameEvents(gameProps);

    // Assets require a loader to be used within the game
    const loader = createLoader(resources);

    // DevUtils includes a panel that can be used to access game object properties during runtime
    if (import.meta.env.MODE === 'useDevUtils') {
        useDevUtils(gameProps);
    }

    // Finally, calling game.start() loads game assets & starts the game
    game.start(loader);
};
