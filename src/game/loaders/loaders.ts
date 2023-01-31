import { Loader } from 'excalibur';
import { Resources } from 'game/resources';

/**
 * Creates loader for game assets. Further load configuration available as well.
 * @param props Assets that require a loader
 * @returns
 */
export const createLoader = (props: Resources) => {
    const { sounds, images } = props;

    /**
     * Loading assets
     */
    const resources = Object.values({ ...sounds, ...images });
    const loader = new Loader(resources);

    /**
     * Loader allows for more control over the game start
     * Full example through site/site.ts & site/site.css to see the difference
     * */

    /*
    loader.startButtonFactory = () => {
        let startButton = document.getElementById(gameStartButtonID);

         if (!startButton) {
             console.error('Start button not defined!');
             startButton = document.createElement('button');
            startButton.textContent = 'Start game';
        }

        if (startButton.nodeName !== 'BUTTON') {
            console.error('Start button not a button element!');
            startButton = document.createElement('button');
            startButton.textContent = 'Start game';
        }

        return startButton as HTMLButtonElement;
    };
    */

    return loader;
};
