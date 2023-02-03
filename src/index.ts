import { generateLevel } from 'game/generators/worldGenerator';
import { initGame } from 'game/main';
import { createSite } from 'site/site';

createSite();
initGame();
generateLevel(10, 10, 2, 4);
