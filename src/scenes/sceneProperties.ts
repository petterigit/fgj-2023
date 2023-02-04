import { Vector } from 'excalibur';
import { SceneKeys } from 'game/scenes/gamescenes';
import { ColliderPos, GameProps, SceneProperties } from '../game/types';

export const Scenario1PropertiesGenerator = (
    props: GameProps
): SceneProperties => {
    const groundTiles = props.spriteSheets.ground;
    //const detailTiles = props.spriteSheets.trees;
    const imageMin = 50;
    const imageMax = 200;
    const step = (imageMax - imageMin) / (2);
    const cliff = props.spriteSheets.cliff;

    const greenTrees = [
        props.objects.trees.Green1,
        props.objects.trees.Green2,
        props.objects.trees.Green3,
        props.objects.trees.Green4,
        props.objects.trees.Green5,
        props.objects.trees.Green6,
    ];

    return {
        width: 140,
        height: 140,
        resolution: 10,
        detailResolution: 2,
        zValue: 10,
        detailZValue: 6,
        onDeath: SceneKeys.Menu,
        getGroundTile: (noise: number) => {
            if (noise <= imageMin) noise = imageMin;
            if (noise >= imageMax) noise = (imageMax - 1);
            noise -= imageMin;
            const imageIndex = Math.floor(noise / step);
            return groundTiles.getSprite(imageIndex * 11 + 1, 1);
        },
        getDetailTile: (pos: Vector) => {
            return sample(greenTrees)(pos);
        },
        getColliderTile: (pos: ColliderPos) => {
            switch (pos) {
                case ColliderPos.sideBottom:
                    return cliff.getSprite(2, 1)!
                default:
                    return cliff.getSprite(2, 1)!
            }
        },
    };
};

export const Scenario2PropertiesGenerator = (
    props: GameProps
): SceneProperties => {
    const groundTiles = props.spriteSheets.ground;
    //const detailTiles = props.spriteSheets.trees;
    const imageMin = 50;
    const imageMax = 200;
    const step = (imageMax - imageMin) / (2);
    const cliff = props.spriteSheets.cliff;



    const redTrees = [
        props.objects.trees.Red1,
        props.objects.trees.Red2,
        props.objects.trees.Red3,
        props.objects.trees.Red4,
        props.objects.trees.Red5,
        props.objects.trees.Red6,
    ];

    return {
        width: 140,
        height: 140,
        resolution: 10,
        detailResolution: 2,
        zValue: 10,
        detailZValue: 6,
        onDeath: SceneKeys.Menu,
        getGroundTile: (noise: number) => {
            if (noise <= imageMin) noise = imageMin;
            if (noise >= imageMax) noise = (imageMax - 1);
            noise -= imageMin;
            const imageIndex = Math.floor(noise / step);
            return groundTiles.getSprite(imageIndex * 11 + 1, 11);
        },
        getDetailTile: (pos: Vector) => {
            return sample(redTrees)(pos);
        },
        getColliderTile: (pos: ColliderPos) => {
            switch (pos) {
                case ColliderPos.sideBottom:
                    return cliff.getSprite(2, 1)!
                default:
                    return cliff.getSprite(2, 1)!
            }
        },
    };
};

const sample = <T>(arr: Array<T>) =>
    arr[Math.floor(Math.random() * arr.length)];
