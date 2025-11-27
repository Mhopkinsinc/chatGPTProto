
import * as ex from 'excalibur';
import { Resources } from '../../../resources';

export class PlayerActor extends ex.Actor {

    private spriteSheet!: ex.SpriteSheet;
    private idleSprite!: ex.Sprite;

    constructor(x: number, y: number) {
      super({
        x,
        y,
        width: 16,
        height: 32,
        collisionType: ex.CollisionType.Active,
        anchor: ex.vec(1, 1),
        name: 'PlayerActor'
      });
    }

    public onInitialize() {
          // Create spritesheet (1 row, 5 columns, 32x32 each)
            this.spriteSheet = ex.SpriteSheet.fromImageSource({
              image: Resources.playerup,
              grid: { rows: 1, columns: 5, spriteWidth: 32, spriteHeight: 32 }
            });

    // Idle sprite at frame (0,1)
    this.idleSprite = this.spriteSheet.getSprite(0, 0);

    const runAnim = ex.Animation.fromSpriteSheet(this.spriteSheet, ex.range(1, 4), 167);

    // Start with idle graphic
    this.graphics.use(runAnim);
    }
}