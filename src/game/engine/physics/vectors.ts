import { vec, Vector } from 'excalibur';

export function normalizeAndScale(
    x: number,
    y: number,
    targetVectorLength: number
) {
    if (x === 0 && y === 0) {
        return vec(0, 0);
    }

    const v = vec(x, y).normalize();

    const newX = v.x * targetVectorLength;
    const newY = v.y * targetVectorLength;

    return vec(newX, newY);
}

export const vectorDirectionToRadians = (vector: Vector): number => {
    if (vector.equals(Vector.Up)) {
        return Math.PI / 2;
    }
    if (vector.equals(Vector.Down)) {
        return (3 * Math.PI) / 2;
    }
    if (vector.equals(Vector.Left)) {
        return Math.PI;
    }
    if (vector.equals(Vector.Right)) {
        return 0;
    }
    return 0;
};
