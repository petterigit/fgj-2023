import { Actor, Sprite, Vector } from 'excalibur';

export const createTree = (treeSprite: Sprite): Actor => {
    const tree = new Actor({
        name: 'niilo-duck', // optionally assign a name
        pos: new Vector(300, 275),
        scale: new Vector(0.25, 0.25),
    });

    const duckSprite = treeSprite;
    tree.graphics.use(duckSprite);

    return tree;
};
