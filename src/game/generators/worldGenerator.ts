import * as noise from 'quick-perlin-noise-js';

interface Rgb {
    r: number;
    g: number;
    b: number;
}

export const generateLevel = (
    width: number,
    height: number,
    resolution: number,
    zValue: number
) => {
    const map: Rgb[][] = new Array(width).fill(0).map(() => new Array(height));

    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            const noiseR =
                noise.noise(x / resolution, y / resolution, 0 + zValue) + 1;
            const noiseG =
                noise.noise(x / resolution, y / resolution, 1 + zValue) + 1;
            const noiseB =
                noise.noise(x / resolution, y / resolution, 2 + zValue) + 1;
            const r = Math.floor(noiseR * 128) & 0xff;
            const g = Math.floor(noiseG * 128) & 0xff;
            const b = Math.floor(noiseB * 128) & 0xff;
            map[x][y] = { r, g, b };
        }
    }

    console.log(JSON.stringify(map, null, 2));
};
