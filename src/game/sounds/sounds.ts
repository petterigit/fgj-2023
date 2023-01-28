import { Sound } from "excalibur";

import viiskauttaviis from "../assets/sounds/viiskauttaviis1.mp3";

type SoundType = "viisKauttaViis";

export type Sounds = { [S in SoundType]: Sound };

export const createSounds = (): Sounds => {
  const sounds: Sounds = {
    viisKauttaViis: new Sound(viiskauttaviis),
  };

  return sounds;
};
