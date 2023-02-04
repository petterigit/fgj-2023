import { Engine, Scene, Sprite } from 'excalibur';
import { createObjects } from './objects/createObjects';
import { createGraphics } from './resources/graphics/graphics';
import { createImages } from './resources/images/images';
import { createSounds } from './resources/sounds/sounds';
import { SceneKeys } from './scenes/gamescenes';
import { createSpriteSheets } from './spriteSheets/createSpriteSheets';

export type Game = Engine;

export interface SceneProperties {
    width: number;
    height: number;
    resolution: number;
    detailResolution: number;
    zValue: number;
    detailZValue: number;
    getGroundTile(noise: number): Sprite | null;
    getDetailTile(noise: number): Sprite | null;
    getColliderTile(noise: number): Sprite | null;
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
    spriteSheets: ReturnType<typeof createSpriteSheets>;
}

export interface GameScene {
    key: SceneKeys;
    scene: Scene;
}

export type CharacterName =
    | 'Lavender'
    | 'Shroom'
    | 'Gobbo'
    | 'Furry'
    | 'Tryhard'
    | 'Bob'
    | 'AnimeProtagonist'
    | 'Blondie'
    | 'Berry'
    | 'Teacher';
