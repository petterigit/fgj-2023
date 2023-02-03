import { Resources } from 'game/resources';
import { SceneProperties } from '../game/types';

export const Scenario1PropertiesGenerator  = (resources: Resources): SceneProperties => ({
    width: 100,
    height: 100,
    resolution: 2,
    zValue: 10,
    groundTiles: [resources.images.]
});
