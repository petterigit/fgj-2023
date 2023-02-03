/**
 * Constants that are required in both the game & the site
 */

import { SceneProperties } from 'game/types';

export const GameCanvasID = `game-canvas-${Math.random() * 10000}`;
export const UseDevUtils = 'useDevUtils';

export const TileProperties = {
    width: 160,
    height: 80,
};

export const Scenario1Properties: SceneProperties = {
    width: 100,
    height: 100,
    resolution: 5,
    zValue: 10,
};
