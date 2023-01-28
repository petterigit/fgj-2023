import { Engine } from 'excalibur';
import { Sounds } from './sounds/sounds';

export type Game = Engine;

// eslint-disable-next-line
export interface GameObjects {}

export interface AllProps {
    game: Game;
    objects: GameObjects;
    sounds: Sounds;
}
