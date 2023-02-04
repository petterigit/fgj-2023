import { vec, Input, Engine } from 'excalibur';
import { Player } from 'game/objects/player/Player';
import { PlayerPreUpdateLogicProps } from 'game/types';

export function playerLogic(
    this: Player,
    engine: Engine,
    delta: number
): PlayerPreUpdateLogicProps {
    let newX = 0;
    let newY = 0;

    newX = 0;
    newY = 0;

    if (engine.input.keyboard.isHeld(Input.Keys.Left)) {
        newX = -1;
    }

    if (engine.input.keyboard.isHeld(Input.Keys.Right)) {
        newX = 1;
    }

    if (engine.input.keyboard.isHeld(Input.Keys.Up)) {
        newY = -1;
    }

    if (engine.input.keyboard.isHeld(Input.Keys.Down)) {
        newY = 1;
    }

    return { input: vec(newX, newY) };
}
