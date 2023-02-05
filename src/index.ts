import { initGame } from 'game/main';
import { StatsManager } from 'game/objects/player/statsmanager';
import { AudioManager } from 'game/resources/sounds/audiomanager';
import { createSite } from 'site/site';

// Instatiate global managers
new AudioManager();
new StatsManager();

createSite();
initGame();
