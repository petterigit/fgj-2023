import { GameProps, SceneProperties } from '../game/types';

export const Scenario1PropertiesGenerator = (
    props: GameProps
): SceneProperties => {
    const groundTiles = props.spriteSheets.ground;
    const detailTiles = props.spriteSheets.trees;
    const imageMin = 50;
    const imageMax = 200;
    const step = (imageMax - imageMin) / (2);

    return {
        width: 100,
        height: 100,
        resolution: 10,
        detailResolution: 2,
        zValue: 10,
        detailZValue: 6,
        getGroundTile: (noise: number) => {
            if (noise <= imageMin) noise = imageMin;
            if (noise >= imageMax) noise = (imageMax - 1);
            noise -= imageMin;
            const imageIndex = Math.floor(noise / step);
            return groundTiles.getSprite(imageIndex * 11 + 1, 1);
        },
        getDetailTile: (noise: number) => {
            if (noise > 200) {
                return detailTiles.getSprite(3, 0);
            }
            return null;
        },
        getColliderTile: () => null,
    };
};
