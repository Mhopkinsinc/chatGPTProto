// src/scenes/rink/actors/bottom_net.ts
import * as ex from 'excalibur';
import { Resources } from '../../../resources';

export class BottomNetActor extends ex.Actor {
  private sprite!: ex.Sprite;

  constructor(x: number, y: number) {
    super({
      x,
      y,
      width: 51,
      height: 32,
      anchor: ex.vec(0, 0),
      name: 'BottomNetActor',
      collisionType: ex.CollisionType.Fixed
    });
  }

  public onInitialize(_engine: ex.Engine): void {
    this.sprite = Resources.bottomNet.toSprite();
    this.graphics.use(this.sprite);
  }
}
