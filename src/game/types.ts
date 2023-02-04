import { Engine, Scene, Sprite, Vector } from 'excalibur';
import { createObjects } from './objects/createObjects';
import { Player } from './objects/player/Player';
import { createGraphics } from './resources/graphics/graphics';
import { createImages } from './resources/images/images';
import { createSounds } from './resources/sounds/sounds';
import { SceneKeys } from './scenes/gamescenes';
import { createSpriteSheets } from './spriteSheets/createSpriteSheets';

export type Game = Engine;
export type CreateSpriteSheets = ReturnType<typeof createSpriteSheets>;

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

export type TreeType =
    | 'Yellow1'
    | 'Yellow2'
    | 'Yellow3'
    | 'Yellow4'
    | 'Yellow5'
    | 'Yellow6'
    | 'Red1'
    | 'Red2'
    | 'Red3'
    | 'Red4'
    | 'Red5'
    | 'Red6'
    | 'Green1'
    | 'Green2'
    | 'Green3'
    | 'Green4'
    | 'Green5'
    | 'Green6';

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

export interface AnimatedPlayer {
    idle: Animation;
    left: Animation;
    right: Animation;
    up: Animation;
    down: Animation;
}

export type PlayerPreUpdateLogic = (
    this: Player,
    engine: Engine,
    delta: number
) => PlayerPreUpdateLogicProps;

export interface PlayerPreUpdateLogicProps {
    input: Vector;
    actions: {
        meleeAttack: boolean;
    };
}
