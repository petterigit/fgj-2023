import { createSounds } from './sounds';

type Sounds = ReturnType<typeof createSounds>;

export class AudioManager {
    public static sounds: Sounds;

    constructor() {
        AudioManager.init();
    }

    public static init = () => {
        AudioManager.sounds = createSounds();
    };

    static playSound = (soundKey: keyof Sounds) => {
        this.sounds[soundKey].play();
    };

    static getSounds() {
        return this.sounds;
    }
}
