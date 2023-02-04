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

    static playRandomHitSound() {
        const hitSounds = [
            this.sounds.hit1,
            this.sounds.hit2,
            this.sounds.hit3,
            this.sounds.hit4,
        ];

        const randomIndex = Math.floor(Math.random() * 4);

        const randomHit = hitSounds[randomIndex];

        randomHit.play();
    }

    static playRandomWhooshSound() {
        const whooshSounds = [
            this.sounds.whoosh1,
            this.sounds.whoosh2,
            this.sounds.whoosh3,
            this.sounds.whoosh4,
        ];

        const randomIndex = Math.floor(Math.random() * 4);

        const randomWhoosh = whooshSounds[randomIndex];

        randomWhoosh.play();
    }
}
