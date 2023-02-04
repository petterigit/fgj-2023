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
    let meleeAttack = false,
        rangedAttack = false,
        dash = false;

    if (
        engine.input.keyboard.isHeld(Input.Keys.Left) ||
        engine.input.keyboard.isHeld(Input.Keys.A)
    ) {
        newX = -1;
    }

    if (
        engine.input.keyboard.isHeld(Input.Keys.Right) ||
        engine.input.keyboard.isHeld(Input.Keys.D)
    ) {
        newX = 1;
    }

    if (
        engine.input.keyboard.isHeld(Input.Keys.Up) ||
        engine.input.keyboard.isHeld(Input.Keys.W)
    ) {
        newY = -1;
    }

    if (
        engine.input.keyboard.isHeld(Input.Keys.Down) ||
        engine.input.keyboard.isHeld(Input.Keys.S)
    ) {
        newY = 1;
    }

    if (engine.input.keyboard.isHeld(Input.Keys.Space)) {
        meleeAttack = true;
    }

    if (engine.input.keyboard.isHeld(Input.Keys.E)) {
        rangedAttack = true;
    }

    if (
        engine.input.keyboard.isHeld(Input.Keys.ShiftLeft) ||
        engine.input.keyboard.isHeld(Input.Keys.ShiftRight)
    ) {
        dash = true;
    }

    return {
        input: vec(newX, newY),
        actions: { meleeAttack, dash, rangedAttack },
    };
}
