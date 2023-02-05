import { EnemyDefaultStats } from 'consts';
import { ActorArgs, randomInRange, Scene, vec } from 'excalibur';
import { enemyLogic } from 'game/logics/enemyLogic';
import { Player } from '../player/Player';

export const createEnemy = (
    enemyType: (args?: ActorArgs | undefined) => Player,
    amount: number,
    scene: Scene
) => {
    for (let i = 0; i < amount; i++) {
        const enemy = enemyType({ name: 'enemy' });
        enemy.isAi = true;
        scene.add(enemy);
        enemy.stats = { ...EnemyDefaultStats };
        enemy.pos = vec(
            Math.floor(randomInRange(300, 1900)),
            Math.floor(randomInRange(300, 1900))
        );
        enemy.AddStatefulLogic(enemyLogic);
    }
};
