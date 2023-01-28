import { gameCanvasID, gameContainerID } from '../consts';

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

    const gameContainer = document.createElement('div');
    gameContainer.className = 'gameContainer';
    gameContainer.id = gameContainerID;

    const gameCanvas = document.createElement('canvas');
    gameCanvas.id = gameCanvasID;

    gameContainer.appendChild(gameCanvas);

    siteMain.appendChild(gameContainer);

    /**
     * HTML start button example
     * Full example with loaders/loaders.ts & site.css
     */
    /*
    const gameButton = document.createElement('button');
    gameButton.id = gameStartButtonID;
    gameButton.className = 'gameStartButton';
    gameButton.textContent = 'Start the game';
    gameContainer.appendChild(gameButton);

  */
};
