import {
    BossDefaultStats,
    EnemyDefaultStats,
    GameUI,
    PlayerDefaultStats,
} from 'consts';

interface Stats {
    health: number;
    attack: number;
    speed: number;
}

export class StatsManager {
    public static enemyStats: Stats;
    public static bossStats: Stats;
    public static playerStats: Stats;

    constructor() {
        StatsManager.Init();
    }

    static Init() {
        StatsManager.enemyStats = { ...EnemyDefaultStats };
        StatsManager.bossStats = { ...BossDefaultStats };
        StatsManager.playerStats = { ...PlayerDefaultStats };
    }

    static Reset() {
        StatsManager.Init();
    }

    static FloorStats() {
        StatsManager.playerStats.attack = Math.floor(
            StatsManager.playerStats.attack
        );
        StatsManager.playerStats.health = Math.floor(
            StatsManager.playerStats.health
        );
        StatsManager.playerStats.speed = Math.floor(
            StatsManager.playerStats.speed
        );

        StatsManager.enemyStats.attack = Math.floor(
            StatsManager.enemyStats.attack
        );
        StatsManager.enemyStats.health = Math.floor(
            StatsManager.enemyStats.health
        );
        StatsManager.enemyStats.speed = Math.floor(
            StatsManager.enemyStats.speed
        );

        StatsManager.bossStats.attack = Math.floor(
            StatsManager.bossStats.attack
        );
        StatsManager.bossStats.health = Math.floor(
            StatsManager.bossStats.health
        );
        StatsManager.bossStats.speed = Math.floor(StatsManager.bossStats.speed);
    }

    /**
     * Level up. To be called when level ends.
     * Increases players stats by random & enemies by fixed amount.
     * @returns A level up message for what player stats was incresed & how much
     */
    static LevelUp() {
        StatsManager.enemyStats.attack *= 1.5;
        StatsManager.enemyStats.health *= 1.5;
        StatsManager.enemyStats.speed *= 1.5;

        StatsManager.bossStats.attack *= 1.5;
        StatsManager.bossStats.health *= 1.5;
        StatsManager.bossStats.speed *= 1.5;

        StatsManager.FloorStats();

        const random = Math.random() * 3;

        if (1 > random && random > 0) {
            const attackIncrease = Math.floor(
                StatsManager.playerStats.attack * 1.5
            );
            StatsManager.playerStats.attack += attackIncrease;
            return `Attack was increased by ${attackIncrease}!`;
        }

        if (2 > random && random > 1) {
            const healthIncrease = Math.floor(
                StatsManager.playerStats.health * 1.5
            );
            StatsManager.playerStats.health += healthIncrease;
            return `Health was increased by ${healthIncrease}!`;
        }

        if (3 > random && random > 2) {
            const speedIncrease = Math.floor(
                StatsManager.playerStats.speed * 1.5
            );
            StatsManager.playerStats.speed += speedIncrease;
            return `Speed was increased by ${speedIncrease}!`;
        } else {
            return 'Level up!';
        }
    }
}
