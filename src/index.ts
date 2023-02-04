import { initGame } from 'game/main';
import { AudioManager } from 'game/resources/sounds/audiomanager';
import { createSite } from 'site/site';

// Instatiate audios
new AudioManager();

createSite();
initGame();
