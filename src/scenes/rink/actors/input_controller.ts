// src/scenes/rink/actors/input_controller.ts
import * as ex from 'excalibur';

/**
 * Returns a normalized movement vector based on keyboard input (arrow keys).
 */
export function getMovementVector(engine: ex.Engine): ex.Vector {
  const kb = engine.input.keyboard;
  const move = new ex.Vector(0, 0);

  if (kb.isHeld(ex.Keys.Up)) move.y -= 1;
  if (kb.isHeld(ex.Keys.Down)) move.y += 1;
  if (kb.isHeld(ex.Keys.Left)) move.x -= 1;
  if (kb.isHeld(ex.Keys.Right)) move.x += 1;

  return move;
}
