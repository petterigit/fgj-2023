import { TileProperties } from 'consts';
import { Engine, Scene, TileMap, vec } from 'excalibur';
import { generateNoise } from 'game/generators/worldGenerator';
import { playerLogic } from 'game/logics/playerLogic';
import { Player } from 'game/objects/player/Player';
import { createLevelUpDialog } from 'game/objects/ui-components/LevelUp';
import { GameProps, Resources } from 'game/types';
import { Scenario1PropertiesGenerator } from 'scenes/sceneProperties';
import { SceneKeys } from './gamescenes';

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
    const isoMap = createTileMap(gameProps, scene);

    scene.add(isoMap);

    // Add player function here (if needed)
    scene.add(player);
    player.AddLogic(playerLogic);
    scene.camera.strategy.elasticToActor(player, 0.1, 0.1);
    scene.camera.zoom = 4;

    // Create enemies function here

    // Scene add enemies here

    // Placeholder end level func

    // Idk where it goes, uncomment to test
    /*
    scene.once('predraw', () =>
        endLevel(player, gameProps.game, SceneKeys.Level2, gameProps.resources)
    );
    */

    return scene;
};

/**
 * Utility to end level
 * - Levels up character
 * - Shows Level up message
 * - Sets next level
 */
export const endLevel = (
    player: Player,
    game: Engine,
    nextScene: SceneKeys,
    resources: Resources
) => {
    console.log('End the level');
    const levelUpMessage = player.LevelUp();

    // Show level up message here
    const levelUpElement = createLevelUpDialog(
        vec(200, 100),
        levelUpMessage,
        () => {
            game.goToScene(nextScene);
            levelUpElement.kill();
        },
        resources
    );
    game.currentScene.add(levelUpElement);
};

const createTileMap = (gameProps: GameProps, scene: Scene) => {
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
        tile.addGraphic(
            props.getGroundTile(rgb.r) ??
                gameProps.resources.images.duckImage.toSprite()
        );
    }

    const detailIndexes = detailNoise.reduce(
        (arr, next, i) => {
            return next.b > 200 ? [...arr, i] : arr;
        },
        [0]
    );

    for (const index of detailIndexes) {
        const tile = isoMap.tiles[index];
        const tree = gameProps.objects.trees.Green2(tile.pos);
        scene.add(tree);
    }
    isoMap.z = -1;

    return isoMap;
};
