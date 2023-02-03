import { createGame } from './engine/game';
import { createObjects } from './objects/createObjects';
import { initGameEvents } from './events/gameEvents';
import { useDevUtils } from './devutils';
import { Game, GameObjects, GameProps } from './types';
import { createLoader } from './loaders/loaders';
import { createResources } from './resources';
import { ImageSource, IsometricMap, vec } from 'excalibur';
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
        pos: vec(800, -100),
        tileWidth: 160,
        tileHeight: 80,
        columns: 64,
        rows: 64,
        renderFromTopOfGraphic: true
    });

    const mapNoise = generateLevel(64, 64, 10, 10);

    game.currentScene.add(isoMap);

    for (let i = 0; i < isoMap.tiles.length; i++) {
        const tile = isoMap.tiles[i];
        const rgb = mapNoise[i];

        let image:ImageSource|null = null;
        if (rgb.r > 250) {
            image = resources.images.branch1;
        } else if (rgb.r > 150) {
            image = resources.images.branch2;

        } else {
            image = resources.images.brick1;

        }
        tile.addGraphic(image.toSprite());
    }

    game.start(loader);
};
