import { Engine, ImageSource } from 'excalibur';
import { Resources } from './resources';

export type Game = Engine;

// eslint-disable-next-line
export interface GameObjects {}

export interface GameProps {
    game: Game;
    objects: GameObjects;
    resources: Resources;
}

export interface SceneProperties {
    width: number;
    height: number;
    resolution: number;
    zValue: number;
    groundTiles: ImageSource[];
    detailTiles: ImageSource[];
    colliderTiles: ImageSource[];
    getGroundTile(noise: number): ImageSource;
    getDetailTile(noise: number): ImageSource;
    getColliderTile(noise: number): ImageSource;
}
