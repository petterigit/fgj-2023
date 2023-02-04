import { GameProps, SceneProperties } from '../game/types';

export const Scenario1PropertiesGenerator = (
    props: GameProps
): SceneProperties => {
    const groundTiles = props.spriteSheets.ground;
    const detailTiles = props.spriteSheets.ground;

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
            /*

            const step = (imageMax - imageMin) / (groundTiles. - 1);
            const imageIndex = Math.floor(noise / step);
            */
            return groundTiles.getSprite(0, 0);
        },
        getDetailTile: (noise: number) => {
            if (noise > 180) {
                return detailTiles.getSprite(3, 0);
            }
            return null;
        },
        getColliderTile: () => null,
    };
};
