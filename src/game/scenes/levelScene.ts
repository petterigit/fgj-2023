import { TileProperties } from 'consts';
import { Engine, Scene, Sound, TileMap, vec } from 'excalibur';
import { generateNoise } from 'game/generators/worldGenerator';
import { enemyLogic, newEnemyLogic } from 'game/logics/enemyLogic';
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
    enemyType: Player[],
    tileMapTheme: unknown,
    gameProps: GameProps,
    sound?: Sound
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
    for (const enemy of enemyType) {
        scene.add(enemy);
        enemy.pos = vec(
            Math.floor(Math.random() * (500 - 0 + 1) + 0),
            Math.floor(Math.random() * (500 - 0 + 1) + 0)
        );
        enemy.AddStatefulLogic(newEnemyLogic);
    }

    if (sound) {
        sound.play();
        scene.on('deactivate', () => {
            sound?.stop();
        });
    }

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

    const greenTrees = [
        gameProps.objects.trees.Green1,
        gameProps.objects.trees.Green2,
        gameProps.objects.trees.Green3,
        gameProps.objects.trees.Green4,
        gameProps.objects.trees.Green5,
        gameProps.objects.trees.Green6,
    ];

    const isoMap = new TileMap({
        pos: vec(0, 0),
        tileWidth: TileProperties.width,
        tileHeight: TileProperties.height,
        columns: props.height,
        rows: props.width,
    });
    isoMap.z = -1;

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
        const currentCol = i % props.width;
        const currentRow = Math.floor(i / props.width);
        tile.addGraphic(
            props.getGroundTile(rgb.r) ??
                gameProps.resources.images.duckImage.toSprite()
        );

        if (
            (currentRow === 19 ||
                currentRow === 119 ||
                currentCol === 19 ||
                currentCol === 119) &&
            currentRow >= 19 &&
            currentRow <= 119 &&
            currentCol >= 19 &&
            currentCol <= 119
        ) {
            tile.addGraphic(props.getColliderTile(rgb.r)!);
            tile.solid = true;
        }
    }

    const detailIndexes = detailNoise.reduce(
        (arr, next, i) => {
            return next.b > 200 ? [...arr, i] : arr;
        },
        [0]
    );

    for (const index of detailIndexes) {
        const tile = isoMap.tiles[index];
        const tree = sample(greenTrees)(tile.pos);

        tree.z = 100;
        scene.add(tree);
    }

    return isoMap;
};

const sample = <T>(arr: Array<T>) =>
    arr[Math.floor(Math.random() * arr.length)];
