import { ActorArgs, randomInRange, Scene, vec } from 'excalibur';
import { newEnemyLogic } from 'game/logics/enemyLogic';
import { Player } from '../player/Player';

export const createEnemy = (
    enemyType: (args?: ActorArgs | undefined) => Player,
    amount: number,
    scene: Scene
) => {
    for (let i = 0; i < amount; i++) {
        const enemy = enemyType({ name: 'enemy' });
        scene.add(enemy);
        enemy.pos = vec(
            Math.floor(randomInRange(500, 1000)),
            Math.floor(randomInRange(500, 1000))
        );
        enemy.AddStatefulLogic(newEnemyLogic);
    }
};
