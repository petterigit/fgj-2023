import { Engine } from 'excalibur';
import { Resources } from './resources';

export type Game = Engine;

// eslint-disable-next-line
export interface GameObjects {}

export interface GameProps {
    game: Game;
    objects: GameObjects;
    resources: Resources;
}
