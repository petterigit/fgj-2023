import { Engine } from 'excalibur';
import { Sounds } from '../sounds/sounds';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GameObjects {}

interface Props {
    game: Engine;
    objects: GameObjects;
    sounds: Sounds;
}

export const initGameEvents = (props: Props) => {
    props;
};
