import { Resources } from 'game/types';
import { createGround } from './ground';


export const createSpriteSheets = (resources: Resources) => {
    const groundSheet = createGround(resources);
    return { ground: groundSheet };
};
