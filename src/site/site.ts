import { GameCanvasID } from '../consts';

/**
 * Creates a site to render the game in.
 * Any layout that can be done through HTML & CSS better than
 * through excalibur should be made here
 * @constructs A canvas that excalibur uses to render the game
 */
export const createSite = () => {
    const siteMain = document.getElementById('app');
    if (!siteMain) {
        throw "Document main must have id 'app'!";
    }

    siteMain.className = 'siteMain';

    const gameCanvas = document.createElement('canvas');
    gameCanvas.id = GameCanvasID;

    siteMain.appendChild(gameCanvas);
};
