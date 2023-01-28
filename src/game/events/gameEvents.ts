import { Engine } from 'excalibur';
import { Sounds } from '../sounds/sounds';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GameObjects {}

interface Props {
    game: Engine;
    objects: GameObjects;
    sounds: Sounds;
}

/**
 * Initializes events for properties.
 * Done after initializing the objects, so they can be freely used.
 * @param props Game engine, objects to set events for, and other assets used
 */

// eslint-disable-next-line
export const initGameEvents = (props: Props) => {};
