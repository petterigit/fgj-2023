import { Engine } from 'excalibur';
import { createObjects } from './objects/createObjects';
import { createResources } from './resources';

export type Game = Engine;

export interface SceneProperties {
    width: number;
    height: number;
    resolution: number;
    zValue: number;
}

export type Resources = {
    sounds: ReturnType<typeof createResources>['sounds'];
    images: ReturnType<typeof createResources>['images'];
};

export interface GameProps {
    game: Game;
    objects: ReturnType<typeof createObjects>;
    resources: Resources;
}
