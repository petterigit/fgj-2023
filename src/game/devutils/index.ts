import { DevTool } from '@excaliburjs/dev-tools';
import { AllProps } from '../types';

/**
 * Creates excalibur's own dev-tool for the game engine
 */
export const useDevUtils = (props: AllProps) => {
    new DevTool(props.game);
};
