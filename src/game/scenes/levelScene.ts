import { TileProperties } from 'consts';
import { Scene, TileMap, vec } from 'excalibur';
import { generateNoise } from 'game/generators/worldGenerator';
import { playerLogic } from 'game/logics/playerLogic';
import { Player } from 'game/objects/player/Player';
import { GameProps } from 'game/types';
import { Scenario1PropertiesGenerator } from 'scenes/sceneProperties';

// enemyType === Enum
// Tile map theme === Enum
export const createLevelScene = (
    player: Player,
    enemyType: unknown,
    tileMapTheme: unknown,
    gameProps: GameProps
) => {
    const scene = new Scene();

    // Change this function to create Tile map
    const isoMap = createTileMap(gameProps);

    scene.add(isoMap);

    // Add player function here (if needed)
    scene.add(player);
    player.AddLogic(playerLogic);
    scene.camera.strategy.elasticToActor(player, 0.1, 0.1);
    scene.camera.zoom = 4;

    // Create enemies function here

    // Scene add enemies here

    return scene;
};

const createTileMap = (gameProps: GameProps) => {
    const props = Scenario1PropertiesGenerator(gameProps);

    const isoMap = new TileMap({
        pos: vec(0, 0),
        tileWidth: TileProperties.width,
        tileHeight: TileProperties.height,
        columns: props.height,
        rows: props.width,
    });

    const mapNoise = generateNoise(
        isoMap.columns,
        isoMap.rows,
        props.resolution,
        props.zValue
    );
    const detailNoise = generateNoise(
        isoMap.columns,
        isoMap.rows,
        props.detailResolution,
        props.detailZValue
    );

    for (let i = 0; i < isoMap.tiles.length; i++) {
        const tile = isoMap.tiles[i];
        const rgb = mapNoise[i];
        const detailRgb = detailNoise[i];
        tile.addGraphic(
            props.getGroundTile(rgb.r) ??
                gameProps.resources.images.duckImage.toSprite()
        );
        const detailTile = props.getDetailTile(detailRgb.b);
        if (detailTile) {
            tile.addGraphic(detailTile);
        }
    }

    return isoMap;
};
