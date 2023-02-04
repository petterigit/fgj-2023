import { vec, Input, Engine } from 'excalibur';
import { Player } from 'game/objects/player/Player';
import { PlayerPreUpdateLogicProps } from 'game/types';

export function playerLogic(
    this: Player,
    engine: Engine,
    delta: number
): PlayerPreUpdateLogicProps {
    let newX = 0,
        newY = 0;

    let meleeAttack = false;
    let dash = false;

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

    if (engine.input.keyboard.isHeld(Input.Keys.Space)) {
        meleeAttack = true;
    }

    if (engine.input.keyboard.isHeld(Input.Keys.D)) {
        dash = true;
    }

    return { input: vec(newX, newY), actions: { meleeAttack, dash } };
}
