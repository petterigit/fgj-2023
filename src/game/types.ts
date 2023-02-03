import { Engine, Scene } from 'excalibur';
import { GameObjects } from './objects/createObjects';
import { Resources } from './resources';
import { SceneKeys } from './scenes/gamescenes';

export type Game = Engine;

export interface GameProps {
    game: Game;
    objects: GameObjects;
    resources: Resources;
}

export interface GameScene {
    key: SceneKeys;
    scene: Scene;
}