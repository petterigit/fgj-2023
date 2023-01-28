import { Engine } from "excalibur";
import { Sounds } from "../sounds/sounds";

interface GameObjects {}

interface Props {
  game: Engine;
  objects: GameObjects;
  sounds: Sounds;
}

export const initGameEvents = (props: Props) => {
  props;
};
