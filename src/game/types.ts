import { Actor, Engine, Scene, Sprite, Vector } from 'excalibur';
import { createAnimations } from './animations/createAnimations';
import { createObjects } from './objects/createObjects';
import { Player } from './objects/player/Player';
import { createGraphics } from './resources/graphics/graphics';
import { createImages } from './resources/images/images';
import { SceneKeys } from './scenes/gamescenes';
import { createSpriteSheets } from './spriteSheets/createSpriteSheets';

export type Game = Engine;
export type CreateSpriteSheets = ReturnType<typeof createSpriteSheets>;
export type CreateAnimations = ReturnType<typeof createAnimations>;

export enum ColliderPos {
    sideMiddle,
    sideTop,
    sideBottom,
    verticalMiddle,
    verticalLeft,
    verticalTopLeft,
    verticalBottomLeft,
    verticalBottom,
    verticalBottomRight,
    verticalRight,
    verticalTopRight,
    verticalTop,
}

export interface SceneProperties {
    width: number;
    height: number;
    resolution: number;
    detailResolution: number;
    zValue: number;
    detailZValue: number;
    getGroundTile(noise: number): Sprite | null;
    getDetailTile(pos: Vector): Actor | null;
    getColliderTile(pos: ColliderPos): Sprite | null;
    onDeath?: SceneKeys;
}

export type Resources = {
    images: ReturnType<typeof createImages>;
    graphics: ReturnType<typeof createGraphics>;
};

export interface GameProps {
    game: Game;
    objects: ReturnType<typeof createObjects>;
    resources: Resources;
    spriteSheets: CreateSpriteSheets;
    animations: CreateAnimations;
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

export type PlayerPreUpdateLogicGenerator = () => PlayerPreUpdateLogic;

export type PlayerPreUpdateLogic = (
    this: Player,
    engine: Engine,
    delta: number
) => PlayerPreUpdateLogicProps | null;

export interface PlayerPreUpdateLogicProps {
    input: Vector;
    actions: {
        meleeAttack: boolean;
        rangedAttack: boolean;
        dash: boolean;
    };
    speed?: number;
}
export type Projectile = Actor & { sender: number };
