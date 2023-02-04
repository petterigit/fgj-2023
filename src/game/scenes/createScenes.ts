import { GameProps, GameScene } from 'game/types';
import { createLevel1 } from './level1';
import { createMenu } from './menu';

export const createScenes = (props: GameProps): GameScene[] => {
    const menu = createMenu(props);
    const level1 = createLevel1(props);

    return [menu, level1];
};
