import { Actor, Vector } from 'excalibur';
import { Resources } from 'game/types';

export const createDuck = (resources: Resources): Actor => {
    const duck = new Actor({
        name: 'niilo-duck', // optionally assign a name
        pos: new Vector(300, 275),
        scale: new Vector(0.25, 0.25),
    });

    const duckSprite = resources.images.duckImage.toSprite();
    duck.graphics.use(duckSprite);

    return duck;
};
