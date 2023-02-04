import { randomIntInRange } from 'excalibur';
import { Resources, SceneProperties } from '../game/types';

export const Scenario1PropertiesGenerator = (
    resources: Resources
): SceneProperties => {
    const groundTiles = [
        resources.images.grass1,
        resources.images.grass2,
        resources.images.grass3,
        resources.images.brick1,
        resources.images.grass5,
        resources.images.grass6,
        resources.images.grass7,
    ];
    const detailTiles = [
        resources.images.leaf1,
        resources.images.leaf2,
        resources.images.leaf3,
    ];
    // const colliderTiles = [];

    return {
        width: 100,
        height: 100,
        resolution: 5,
        detailResolution: 2,
        zValue: 10,
        detailZValue: 6,
        getGroundTile: (noise: number) => {
            const imageMin = 50;
            const imageMax = 200;
            if (noise < imageMin) noise = imageMin;
            if (noise > imageMax) noise = imageMax;
            noise -= imageMin;
            const step = (imageMax - imageMin) / (groundTiles.length - 1);
            const imageIndex = Math.floor(noise / step);
            return groundTiles[imageIndex];
        },
        getDetailTile: (noise: number) => {
            if (noise > 180) {
                return detailTiles[randomIntInRange(0, detailTiles.length)];
            }
            return null;
        },
        getColliderTile: () => null,
    };
};
