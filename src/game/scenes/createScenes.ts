import { GameProps, GameScene } from 'game/types';
import { createDialog1 } from './dialog1';
import { createLevel1 } from './level1';
import { createMenu } from './menu';

export const createScenes = (props: GameProps): GameScene[] => {
    const menu = createMenu(props);
    const level1 = createLevel1();
    const dialogue1 = createDialog1(props.game, props.resources);

    return [menu, level1, dialogue1];
};
