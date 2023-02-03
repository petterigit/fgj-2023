import { ImageSource } from 'excalibur';
import { Resources, SceneProperties } from '../game/types';

export const Scenario1PropertiesGenerator = (
    resources: Resources
): SceneProperties => ({
    width: 100,
    height: 100,
    resolution: 2,
    zValue: 10,
    groundTiles: [
        resources.images.grass1,
        resources.images.grass2,
        resources.images.grass3,
        resources.images.grass4,
        resources.images.grass5,
        resources.images.grass6,
        resources.images.grass7,
    ],
    detailTiles: [
        resources.images.leaf1,
        resources.images.leaf2,
        resources.images.leaf3,
    ],
    colliderTiles: [],
    getGroundTile: (noise: number) => {
        let image: ImageSource;
        if (noise > 250) {
            image = resources.images.branch1;
        } else if (noise > 150) {
            image = resources.images.branch2;
        } else {
            image = resources.images.brick1;
        }
        return image;
    },
    getDetailTile: () => null,
    getColliderTile: () => null,
});
