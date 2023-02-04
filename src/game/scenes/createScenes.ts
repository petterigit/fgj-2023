import { GameProps, GameScene } from 'game/types';
import { createDialog1 } from './dialog1';
import { createLevel1 } from './level1';
import { createMenu } from './menu';

export const createScenes = (props: GameProps): GameScene[] => {
    const menu = createMenu(props);
    const dialogue1 = createDialog1(props.game, props.resources);
    const level1 = createLevel1(props);

    return [menu, level1, dialogue1];
};
