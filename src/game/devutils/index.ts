import { DevTool } from '@excaliburjs/dev-tools';
import { GameProps } from 'game/types';

/**
 * Creates excalibur's own dev-tool for the game engine
 */
export const useDevUtils = (props: GameProps) => {
    const { game } = props;
    new DevTool(game);
};
