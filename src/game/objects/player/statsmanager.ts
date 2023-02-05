import {
    BossDefaultStats,
    EnemyDefaultStats,
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
        StatsManager.enemyStats = EnemyDefaultStats;
        StatsManager.bossStats = BossDefaultStats;
        StatsManager.playerStats = PlayerDefaultStats;
    }

    static getEnemyStat(stat: keyof Stats) {
        return StatsManager.enemyStats[stat];
    }
    static getBossStat(stat: keyof Stats) {
        return StatsManager.bossStats[stat];
    }
    static getPlayerStat(stat: keyof Stats) {
        return StatsManager.playerStats[stat];
    }

    /**
     * Level up. To be called when level ends.
     * Increases players stats by random & enemies by fixed amount.
     * @returns A level up message for what player stats was incresed & how much
     */
    static LevelUp() {
        const random = Math.random() * 3;

        StatsManager.enemyStats.attack *= 1.5;
        StatsManager.enemyStats.health *= 1.5;
        StatsManager.enemyStats.speed *= 1.5;

        StatsManager.bossStats.attack *= 1.5;
        StatsManager.bossStats.health *= 1.5;
        StatsManager.bossStats.speed *= 1.5;

        if (1 > random && random > 0) {
            const attackIncrease = StatsManager.playerStats.attack * 2;
            StatsManager.playerStats.attack += attackIncrease;
            return `Attack was increased by ${attackIncrease}!`;
        }

        if (2 > random && random > 1) {
            const healthIncrease = StatsManager.playerStats.health * 2;
            StatsManager.playerStats.health += healthIncrease;
            return `Health was increased by ${healthIncrease}!`;
        }

        if (3 > random && random > 2) {
            const speedIncrease = StatsManager.playerStats.speed * 2;
            StatsManager.playerStats.speed += speedIncrease;
            return `Speed was increased by ${speedIncrease}!`;
        } else {
            return 'Level up!';
        }
    }
}
