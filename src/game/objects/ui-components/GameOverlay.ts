import { GameUI } from 'consts';
import { Color, Engine, Font, ScreenElement, Text, vec } from 'excalibur';
import { Resources } from 'game/types';
import { StatsManager } from '../player/statsmanager';

export const createGameOverlay = (
    engine: Engine,
    resources: Resources
): ScreenElement => {
    const width = engine.drawWidth;
    const height = engine.drawHeight;
    const element = new ScreenElement({
        name: 'gameUI',
        pos: vec(-200, height - GameUI.height),
        color: Color.LightGray,
        width: width + 200,
        height: GameUI.height,
        z: GameUI.z,
    });

    const healthCounterElement = new ScreenElement({
        pos: vec(GameUI.fieldWidth, GameUI.textYOffset),
        z: GameUI.fontZ,
    });

    const healthCounter = new Text({
        text: '',
        font: new Font({ size: GameUI.fontSize }),
    });

    const attackElement = new ScreenElement({
        pos: healthCounterElement.pos.add(vec(GameUI.fieldWidth, 0)),
        z: GameUI.fontZ,
    });

    const attackText = new Text({
        text: '',
        font: new Font({ size: GameUI.fontSize }),
    });

    const movementSpeedElement = new ScreenElement({
        pos: attackElement.pos.add(vec(GameUI.fieldWidth, 0)),
        z: GameUI.fontZ,
    });

    const movementSpeedText = new Text({
        text: '',
        font: new Font({ size: GameUI.fontSize }),
    });

    element.on('postupdate', event => {
        healthCounter.text = `Health: ${StatsManager.playerStats.health}`;
        attackText.text = `Attack: ${StatsManager.playerStats.attack}`;
        movementSpeedText.text = `Movement: ${StatsManager.playerStats.speed}`;
    });

    healthCounterElement.graphics.use(healthCounter);
    attackElement.graphics.use(attackText);
    movementSpeedElement.graphics.use(movementSpeedText);
    element.addChild(healthCounterElement);
    element.addChild(attackElement);
    element.addChild(movementSpeedElement);

    return element;
};
