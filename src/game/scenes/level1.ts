import { TileProperties } from 'consts';
import { Scene, TileMap, vec } from 'excalibur';
import { GameProps, GameScene } from 'game/types';
import { Scenario1PropertiesGenerator } from 'scenes/sceneProperties';
import { SceneKeys } from './gamescenes';
import { generateNoise } from '../generators/worldGenerator';

export const createLevel1 = (gameProps: GameProps) => {
    const scene: GameScene = {
        key: SceneKeys.Level1,
        scene: new Scene(),
    };

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

    scene.scene.add(isoMap);

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

    const child = gameProps.objects.characters.Berry();
    scene.scene.add(child);
    scene.scene.camera.strategy.elasticToActor(child, 0.1, 0.1);
    scene.scene.camera.zoom = 4;

    return scene;
};
