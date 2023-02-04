import * as noise from 'quick-perlin-noise-js';

export interface Rgb {
    r: number;
    g: number;
    b: number;
}

export const generateNoise = (
    width: number,
    height: number,
    resolution: number,
    zValue: number,
    seed?: number
) => {
    const map: Rgb[] = new Array(width)
        .fill(0)
        .map(() => ({ r: 0, g: 0, b: 0 }));

    const createNoise = noise.create(seed);

    let i = 0;
    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            const noiseR =
                createNoise(x / resolution, y / resolution, 0 + zValue) + 1;
            const noiseG =
                createNoise(x / resolution, y / resolution, 1 + zValue) + 1;
            const noiseB =
                createNoise(x / resolution, y / resolution, 2 + zValue) + 1;
            const r = Math.floor(noiseR * 128) & 0xff;
            const g = Math.floor(noiseG * 128) & 0xff;
            const b = Math.floor(noiseB * 128) & 0xff;
            map[i++] = { r, g, b };
        }
    }

    return map;
};
