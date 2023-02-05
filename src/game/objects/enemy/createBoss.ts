import { ActorArgs, Scene, vec, randomInRange } from 'excalibur';
import { bossLogic } from 'game/logics/enemyLogic';
import { SceneKeys } from 'game/scenes/gamescenes';
import { endLevel } from 'game/scenes/levelScene';
import { GameProps } from 'game/types';
import { Player } from '../player/Player';
import { StatsManager } from '../player/statsmanager';

export const createBoss = (
    enemyType: (args?: ActorArgs | undefined) => Player,
    scene: Scene,
    nextScene: SceneKeys,
    player: Player,
    gameProps: GameProps
) => {
    const boss = enemyType({ name: 'boss' });
    boss.isAi = true;
    scene.add(boss);
    boss.stats = { ...StatsManager.bossStats };
    boss.pos = vec(
        Math.floor(randomInRange(500, 1000)),
        Math.floor(randomInRange(500, 1000))
    );
    boss.AddStatefulLogic(bossLogic);
    boss.on('kill', () => {
        endLevel(player, gameProps, nextScene);
    });
};
