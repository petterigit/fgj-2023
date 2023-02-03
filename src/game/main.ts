import { createGame } from './engine/game';
import { createObjects } from './objects/createObjects';
import { initGameEvents } from './events/gameEvents';
import { useDevUtils } from './devutils';
import { Game, GameObjects, GameProps } from './types';
import { createLoader } from './loaders/loaders';
import { createResources } from './resources';
import { ImageSource, IsometricMap, randomInRange, vec } from 'excalibur';
import { generateLevel } from './generators/worldGenerator';
import { TileProperties, UseDevUtils } from 'consts';
import { Scenario1Properties } from 'scenes/sceneProperties';

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

    if (import.meta.env.MODE === UseDevUtils) {
        useDevUtils(gameProps);
    }

    const isoMap = new IsometricMap({
        pos: vec(0, 0),
        tileWidth: TileProperties.width,
        tileHeight: TileProperties.height,
        columns: Scenario1Properties.height,
        rows: Scenario1Properties.width,
    });

    const mapNoise = generateLevel(
        isoMap.tileWidth,
        isoMap.tileHeight,
        Scenario1Properties.resolution,
        Scenario1Properties.zValue
    );

    game.currentScene.add(isoMap);

    for (let i = 0; i < isoMap.tiles.length; i++) {
        const tile = isoMap.tiles[i];
        const rgb = mapNoise[i];

        let image: ImageSource;
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
