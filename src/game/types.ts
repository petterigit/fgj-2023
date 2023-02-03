import { Engine, ImageSource, Scene } from 'excalibur';
import { createObjects } from './objects/createObjects';
import { createGraphics } from './resources/graphics/graphics';
import { createImages } from './resources/images/images';
import { createSounds } from './resources/sounds/sounds';
import { SceneKeys } from './scenes/gamescenes';

export type Game = Engine;

export interface SceneProperties {
    width: number;
    height: number;
    resolution: number;
    zValue: number;
    groundTiles: ImageSource[];
    detailTiles: ImageSource[];
    colliderTiles: ImageSource[];
    getGroundTile(noise: number): ImageSource | null;
    getDetailTile(noise: number): ImageSource | null;
    getColliderTile(noise: number): ImageSource | null;
}

export type Resources = {
    sounds: ReturnType<typeof createSounds>;
    images: ReturnType<typeof createImages>;
    graphics: ReturnType<typeof createGraphics>;
};

export interface GameProps {
    game: Game;
    objects: ReturnType<typeof createObjects>;
    resources: Resources;
}

export interface GameScene {
    key: SceneKeys;
    scene: Scene;
}
