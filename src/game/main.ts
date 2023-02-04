import { createGame } from './engine/game';
import { createObjects } from './objects/createObjects';
import { initGameEvents } from './events/gameEvents';
import { useDevUtils } from './devutils';
import { createLoader } from './loaders/loaders';
import { createResources } from './resources';
import { IsometricMap, TileMap, vec } from 'excalibur';
import { generateLevel } from './generators/worldGenerator';
import { TileProperties, UseDevUtils } from 'consts';
import { Scenario1PropertiesGenerator } from 'scenes/sceneProperties';

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
    const objects = createObjects(game, resources);

    const gameProps = { game, objects, resources };

    initGameEvents(gameProps);

    const loader = createLoader(resources);

    if (import.meta.env.MODE === UseDevUtils) {
        useDevUtils(gameProps);
    }

    const props = Scenario1PropertiesGenerator(resources);

    const isoMap = new TileMap({
        pos: vec(0, 0),
        tileWidth: TileProperties.width,
        tileHeight: TileProperties.height,
        columns: props.height,
        rows: props.width,
    });

    const mapNoise = generateLevel(
        isoMap.tileWidth,
        isoMap.tileHeight,
        props.resolution,
        props.zValue
    );

    game.currentScene.add(isoMap);

    for (let i = 0; i < isoMap.tiles.length; i++) {
        const tile = isoMap.tiles[i];
        const rgb = mapNoise[i];
        tile.addGraphic(
            (props.getGroundTile(rgb.r) ?? resources.images.tile1).toSprite()
        );
    }

    game.start(loader);
};
