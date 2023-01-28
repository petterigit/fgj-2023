import { createGame } from './engine/game';
import { createObjects } from './game/createObjects';
import { initGameEvents } from './events/gameEvents';
import { useDevUtils } from './devutils';
import { AllProps, Game, GameObjects } from './types';
import { createLoader } from './loaders/loaders';
import { createSounds, Sounds } from './sounds/sounds';

/**
 * Creates the game, adds game objects to the game, loads assets, toggles dev utils for the game, and finally, starts the game
 */
export const startGame = () => {
    // Creating a game requires:

    // 1) Game - An engine that keeps everything going
    const game: Game = createGame();

    // 2) Game objects that are added to the game
    const objects: GameObjects = createObjects(game);

    // 3) Static assets that can be used inside the game
    const sounds: Sounds = createSounds();

    // These objects are used through this variable
    const allProps: AllProps = { game, objects, sounds };

    // Game events need to be configured after everything is set
    initGameEvents(allProps);

    // Assets require a loader to be used within the game
    const loader = createLoader({ sounds });

    // DevUtils includes a panel that can be used to access game object properties during runtime
    if (import.meta.env.MODE === 'useDevUtils') {
        useDevUtils(allProps);
    }

    // Finally, calling game.start() loads game assets & starts the game
    game.start(loader);
};
