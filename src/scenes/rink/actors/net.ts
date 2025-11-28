// src/scenes/rink/actors/net.ts
import * as ex from 'excalibur';
import { Resources } from '../../../resources';

export class NetActor extends ex.Actor {
  private sprite!: ex.Sprite;

  constructor(x: number, y: number) {
    super({
      x,
      y,
      width: 51,
      height: 30,
      anchor: ex.vec(0, 0),
      name: 'NetActor',
      collisionType: ex.CollisionType.Fixed
    });
  }

  public onInitialize(_engine: ex.Engine): void {
    this.sprite = Resources.topNet.toSprite();
    this.graphics.use(this.sprite);
  }
}
