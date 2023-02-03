import { createGame } from './engine/game';
import { createObjects } from './objects/createObjects';
import { initGameEvents } from './events/gameEvents';
import { useDevUtils } from './devutils';
import { Game, GameObjects, GameProps } from './types';
import { createLoader } from './loaders/loaders';
import { createResources } from './resources';
import { IsometricMap, vec } from 'excalibur';
import { generateLevel } from './generators/worldGenerator';

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
    const game: Game = createGame();
    const resources = createResources();
    const objects: GameObjects = createObjects(game, resources);

    const gameProps: GameProps = { game, objects, resources };

    initGameEvents(gameProps);

    const loader = createLoader(resources);

    if (import.meta.env.MODE === 'useDevUtils') {
        useDevUtils(gameProps);
    }

    const isoMap = new IsometricMap({
        pos: vec(0, 0),
        tileWidth: 382,
        tileHeight: 805,
        columns: 64,
        rows: 64,
    });

    const mapNoise = generateLevel(64, 64, 10, 10);

    game.currentScene.add(isoMap);
    for (const tile of isoMap.tiles) {
        tile.addGraphic();
    }

    game.start(loader);
};
