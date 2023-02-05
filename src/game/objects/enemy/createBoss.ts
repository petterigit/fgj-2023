import { BossDefaultStats } from 'consts';
import { ActorArgs, Scene, vec, randomInRange, Engine } from 'excalibur';
import { bossLogic } from 'game/logics/enemyLogic';
import { SceneKeys } from 'game/scenes/gamescenes';
import { endLevel } from 'game/scenes/levelScene';
import { Resources } from 'game/types';
import { Player } from '../player/Player';

export const createBoss = (
    enemyType: (args?: ActorArgs | undefined) => Player,
    scene: Scene,
    nextScene: SceneKeys,
    player: Player,
    game: Engine,
    resources: Resources
) => {
    const boss = enemyType({ name: 'boss' });
    boss.isAi = true;
    scene.add(boss);
    boss.stats = { ...BossDefaultStats };
    boss.pos = vec(
        Math.floor(randomInRange(500, 1000)),
        Math.floor(randomInRange(500, 1000))
    );
    boss.AddStatefulLogic(bossLogic);
    boss.on('kill', () => {
        endLevel(player, game, nextScene, resources);
    });
};
