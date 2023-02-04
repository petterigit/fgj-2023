import { Vector } from 'excalibur';

export const vectorDirectionToRadians = (vector: Vector): number => {
    if (vector.x === Vector.Up.x && vector.y === Vector.Up.y) {
        return Math.PI / 2;
    }
    if (vector.x === Vector.Down.x && vector.y === Vector.Down.y) {
        return (3 * Math.PI) / 2;
    }
    if (vector.x === Vector.Left.x && vector.y === Vector.Left.y) {
        return Math.PI;
    }
    if (vector.x === Vector.Right.x && vector.y === Vector.Right.y) {
        return 0;
    }
    return 0;
};
