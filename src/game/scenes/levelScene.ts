import { TileProperties } from 'consts';
import { ActorArgs, Engine, Scene, Sound, TileMap, vec } from 'excalibur';
import { generateNoise } from 'game/generators/worldGenerator';
import { playerLogic } from 'game/logics/playerLogic';
import { createBoss } from 'game/objects/enemy/createBoss';
import { createEnemy } from 'game/objects/enemy/createEnemy';
import { Player } from 'game/objects/player/Player';
import { createLevelUpDialog } from 'game/objects/ui-components/LevelUp';
import { ColliderPos, GameProps, Resources, SceneProperties } from 'game/types';
import { SceneKeys } from './gamescenes';

// enemyType === Enum
// Tile map theme === Enum
export const createLevelScene = (
    player: Player,
    enemyType: ((args?: ActorArgs | undefined) => Player)[],
    bossType: (args?: ActorArgs | undefined) => Player,
    tileMapTheme: unknown,
    gameProps: GameProps,
    sceneProps: SceneProperties,
    nextScene: SceneKeys,
    sound?: Sound
) => {
    const scene = new Scene();

    // Change this function to create Tile map
    const isoMap = createTileMap(gameProps, scene, sceneProps);

    scene.add(isoMap);

    // Add player function here (if needed)
    scene.add(player);
    player.AddLogic(playerLogic);
    scene.camera.strategy.elasticToActor(player, 0.1, 0.1);
    scene.camera.zoom = 4;

    player.onPostKill = _scene =>
        handleEndGame(gameProps.game, gameProps.resources, sceneProps.onDeath);

    // Create enemies function here
    for (const enemy of enemyType) {
        createEnemy(enemy, 5, scene);
    }

    createBoss(
        bossType,
        scene,
        nextScene,
        player,
        gameProps.game,
        gameProps.resources
    );

    if (sound) {
        scene.on('activate', () => {
            sound.play();
        });
        scene.on('deactivate', () => {
            sound.pause();
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

export const handleEndGame = (
    game: Engine,
    resources: Resources,
    nextScene: SceneKeys = SceneKeys.Menu
) => {
    game.goToScene(nextScene);
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

const createTileMap = (
    gameProps: GameProps,
    scene: Scene,
    sceneProps: SceneProperties
) => {
    const isoMap = new TileMap({
        pos: vec(0, 0),
        tileWidth: TileProperties.width,
        tileHeight: TileProperties.height,
        columns: sceneProps.height,
        rows: sceneProps.width,
    });
    isoMap.z = -1;

    const mapNoise = generateNoise(
        isoMap.columns,
        isoMap.rows,
        sceneProps.resolution,
        sceneProps.zValue
    );
    const detailNoise = generateNoise(
        isoMap.columns,
        isoMap.rows,
        sceneProps.detailResolution,
        sceneProps.detailZValue
    );

    for (let i = 0; i < isoMap.tiles.length; i++) {
        const tile = isoMap.tiles[i];
        const rgb = mapNoise[i];
        const currentCol = i % sceneProps.width;
        const currentRow = Math.floor(i / sceneProps.width);
        tile.addGraphic(
            sceneProps.getGroundTile(rgb.r) ??
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
            tile.addGraphic(
                sceneProps.getColliderTile(ColliderPos.sideBottom)!
            );
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
        const detail = sceneProps.getDetailTile(tile.pos);
        if (detail) {
            detail.z = 100;
            scene.add(detail);
        }
    }

    return isoMap;
};
