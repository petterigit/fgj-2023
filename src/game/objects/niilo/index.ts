import { Actor, Color, Vector } from 'excalibur';
import { Resources } from '../../resources';

export const createNiilo = (resources: Resources): Actor => {
    const niilo = new Actor({
        name: 'player', // optionally assign a name
        radius: 50,
        color: Color.Red,
        pos: new Vector(300, 275),
    });

    const niiloSprite = resources.images.niiloImage.toSprite();
    niilo.graphics.use(niiloSprite);

    return niilo;
};
