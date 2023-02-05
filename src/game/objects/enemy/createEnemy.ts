import { EnemyDefaultStats } from 'consts';
import { ActorArgs, Scene, vec } from 'excalibur';
import { enemyLogic } from 'game/logics/enemyLogic';
import { Player } from '../player/Player';

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const X_MIN = 300;
const X_MAX = 1900;
const Y_MIN = 300;
const Y_MAX = 1900;

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
        enemy.pos = vec(getRandomInt(X_MIN, X_MAX), getRandomInt(Y_MIN, Y_MAX));
        console.log(enemy.pos.x, ' : ', enemy.pos.y);

        enemy.AddStatefulLogic(enemyLogic);
    }
};
