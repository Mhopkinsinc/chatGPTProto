
import * as ex from 'excalibur';
import { Resources } from '../../../resources';

export class PlayerActor extends ex.Actor {

  private spriteSheetUp!: ex.SpriteSheet;
  private spriteSheetDown!: ex.SpriteSheet;
  private idleSpriteUp!: ex.Sprite;
  private idleSpriteDown!: ex.Sprite;
  private currentDirection: 'up' | 'down' = 'up';

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
      // Create spritesheets for up and down directions (1 row, 5 columns, 32x32 each)
      this.spriteSheetUp = ex.SpriteSheet.fromImageSource({
        image: Resources.playerup,
        grid: { rows: 1, columns: 5, spriteWidth: 32, spriteHeight: 32 }
      });
      this.spriteSheetDown = ex.SpriteSheet.fromImageSource({
        image: Resources.playerdown,
        grid: { rows: 1, columns: 5, spriteWidth: 32, spriteHeight: 32 }
      });

      // Idle sprites
      this.idleSpriteUp = this.spriteSheetUp.getSprite(0, 0);
      this.idleSpriteDown = this.spriteSheetDown.getSprite(0, 0);


      // Custom animations with per-frame durations (using frame objects)
      const runAnimUp = new ex.Animation({
        frames: [
          { graphic: this.spriteSheetUp.getSprite(1, 0), duration: 167 },
          { graphic: this.spriteSheetUp.getSprite(2, 0), duration: 167 },
          { graphic: this.spriteSheetUp.getSprite(3, 0), duration: 167 },
          { graphic: this.spriteSheetUp.getSprite(4, 0), duration: 250 }
        ]
      });

      const runAnimDown = new ex.Animation({
        frames: [
          { graphic: this.spriteSheetDown.getSprite(1, 0), duration: 167 },
          { graphic: this.spriteSheetDown.getSprite(2, 0), duration: 167 },
          { graphic: this.spriteSheetDown.getSprite(3, 0), duration: 167 },
          { graphic: this.spriteSheetDown.getSprite(4, 0), duration: 250 }
        ]
      });

      // Start with up direction animation
      this.graphics.use(runAnimUp);

      // Example: switch direction (replace with your own logic)
      this.on('preupdate', () => {
        // Example: toggle direction every second (for demonstration)
        // Replace with your own input or movement logic
        const time = Number(this.scene?.engine.clock.now ?? 0);
        if (Math.floor(time / 1000) % 2 === 0) {
          if (this.currentDirection !== 'up') {
            this.graphics.use(runAnimUp);
            this.currentDirection = 'up';
          }
        } else {
          if (this.currentDirection !== 'down') {
            this.graphics.use(runAnimDown);
            this.currentDirection = 'down';
          }
        }
      });
    }
}