import { gameCanvasID, gameContainerID } from '../consts';

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
