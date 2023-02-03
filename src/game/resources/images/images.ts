import { ImageSource } from 'excalibur';

import duckImage from 'assets/images/duck.jpg';
import branch1 from 'assets/tilesets/black_and_white_horror/branch1.png';
import branch2 from 'assets/tilesets/black_and_white_horror/branch2.png';
import brick1 from 'assets/tilesets/black_and_white_horror/brick1.png';
import bush1 from 'assets/tilesets/black_and_white_horror/bush1.png';
import dirt1 from 'assets/tilesets/black_and_white_horror/dirt1.png';
import dust1 from 'assets/tilesets/black_and_white_horror/dust1.png';
import dust2 from 'assets/tilesets/black_and_white_horror/dust2.png';
import fire1 from 'assets/tilesets/black_and_white_horror/fire1.png';
import flower1 from 'assets/tilesets/black_and_white_horror/flower1.png';
import flower2 from 'assets/tilesets/black_and_white_horror/flower2.png';
import flower3 from 'assets/tilesets/black_and_white_horror/flower3.png';
import flower4 from 'assets/tilesets/black_and_white_horror/flower4.png';
import grass1 from 'assets/tilesets/black_and_white_horror/grass1.png';
import grass2 from 'assets/tilesets/black_and_white_horror/grass2.png';
import grass3 from 'assets/tilesets/black_and_white_horror/grass3.png';
import grass4 from 'assets/tilesets/black_and_white_horror/grass4.png';
import grass5 from 'assets/tilesets/black_and_white_horror/grass5.png';
import grass6 from 'assets/tilesets/black_and_white_horror/grass6.png';
import grass7 from 'assets/tilesets/black_and_white_horror/grass7.png';
import ground_tile_foliage1 from 'assets/tilesets/black_and_white_horror/ground_tile_foliage1.png';
import ground_tile_foliage2 from 'assets/tilesets/black_and_white_horror/ground_tile_foliage2.png';
import ground_tile_poroust1 from 'assets/tilesets/black_and_white_horror/ground_tile_porous1.png';
import ground_tile_poroust2 from 'assets/tilesets/black_and_white_horror/ground_tile_porous2.png';
import leaf1 from 'assets/tilesets/black_and_white_horror/leaf1.png';
import leaf2 from 'assets/tilesets/black_and_white_horror/leaf2.png';
import leaf3 from 'assets/tilesets/black_and_white_horror/leaf3.png';
import moss1 from 'assets/tilesets/black_and_white_horror/moss1.png';
import moss2 from 'assets/tilesets/black_and_white_horror/moss2.png';
import pebble1 from 'assets/tilesets/black_and_white_horror/pebble1.png';
import pebble2 from 'assets/tilesets/black_and_white_horror/pebble2.png';
import plank1 from 'assets/tilesets/black_and_white_horror/plank1.png';
import plank2 from 'assets/tilesets/black_and_white_horror/plank2.png';
import plank3 from 'assets/tilesets/black_and_white_horror/plank3.png';
import road1 from 'assets/tilesets/black_and_white_horror/road1.png';
import rock1 from 'assets/tilesets/black_and_white_horror/rock1.png';
import rock2 from 'assets/tilesets/black_and_white_horror/rock2.png';
import rock3 from 'assets/tilesets/black_and_white_horror/rock3.png';
import sand1 from 'assets/tilesets/black_and_white_horror/sand1.png';
import sand2 from 'assets/tilesets/black_and_white_horror/sand2.png';
import sand3 from 'assets/tilesets/black_and_white_horror/sand3.png';
import sand4 from 'assets/tilesets/black_and_white_horror/sand4.png';
import sprouts1 from 'assets/tilesets/black_and_white_horror/sprouts1.png';
import tile1 from 'assets/tilesets/black_and_white_horror/tile1.png';
import tile2 from 'assets/tilesets/black_and_white_horror/tile2.png';
import tile3 from 'assets/tilesets/black_and_white_horror/tile3.png';
import tropical3 from 'assets/tilesets/black_and_white_horror/tropical3.png';
import twig1 from 'assets/tilesets/black_and_white_horror/twig1.png';
import twig2 from 'assets/tilesets/black_and_white_horror/twig2.png';
import water1 from 'assets/tilesets/black_and_white_horror/water1.png';
import wood1 from 'assets/tilesets/black_and_white_horror/wood1.png';

/**
 * Create images. Probably same process for other static assets.
 * @returns image files how excalibur wants them
 */
export const createImages = () => {
    const images = {
        duckImage: new ImageSource(duckImage),
        branch1: new ImageSource(branch1),
        branch2: new ImageSource(branch2),
        brick1: new ImageSource(brick1),
        bush1: new ImageSource(bush1),
        dirt1: new ImageSource(dirt1),
        dust1: new ImageSource(dust1),
        dust2: new ImageSource(dust2),
        fire1: new ImageSource(fire1),
        flower1: new ImageSource(flower1),
        flower2: new ImageSource(flower2),
        flower3: new ImageSource(flower3),
        flower4: new ImageSource(flower4),
        grass1: new ImageSource(grass1),
        grass2: new ImageSource(grass2),
        grass3: new ImageSource(grass3),
        grass4: new ImageSource(grass4),
        grass5: new ImageSource(grass5),
        grass6: new ImageSource(grass6),
        grass7: new ImageSource(grass7),
        ground_tile_foliage1: new ImageSource(ground_tile_foliage1),
        ground_tile_foliage2: new ImageSource(ground_tile_foliage2),
        ground_tile_poroust1: new ImageSource(ground_tile_poroust1),
        ground_tile_poroust2: new ImageSource(ground_tile_poroust2),
        leaf1: new ImageSource(leaf1),
        leaf2: new ImageSource(leaf2),
        leaf3: new ImageSource(leaf3),
        moss1: new ImageSource(moss1),
        moss2: new ImageSource(moss2),
        pebble1: new ImageSource(pebble1),
        pebble2: new ImageSource(pebble2),
        plank1: new ImageSource(plank1),
        plank2: new ImageSource(plank2),
        plank3: new ImageSource(plank3),
        road1: new ImageSource(road1),
        rock1: new ImageSource(rock1),
        rock2: new ImageSource(rock2),
        rock3: new ImageSource(rock3),
        sand1: new ImageSource(sand1),
        sand2: new ImageSource(sand2),
        sand3: new ImageSource(sand3),
        sand4: new ImageSource(sand4),
        sprouts1: new ImageSource(sprouts1),
        tile1: new ImageSource(tile1),
        tile2: new ImageSource(tile2),
        tile3: new ImageSource(tile3),
        tropical3: new ImageSource(tropical3),
        twig1: new ImageSource(twig1),
        twig2: new ImageSource(twig2),
        water1: new ImageSource(water1),
        wood1: new ImageSource(wood1),
    } as const;

    return images;
};
