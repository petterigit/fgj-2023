import { Actor, Vector } from 'excalibur';
import { Resources } from 'game/resources';

export const createNiilo = (resources: Resources): Actor => {
    const niilo = new Actor({
        name: 'niilo', // optionally assign a name
        pos: new Vector(300, 275),
    });

    const niiloSprite = resources.images.niiloImage.toSprite();
    niilo.graphics.use(niiloSprite);

    return niilo;
};
