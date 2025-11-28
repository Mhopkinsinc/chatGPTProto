
import * as ex from 'excalibur';
import { Resources } from '../../../resources';
import { getMovementVector } from './input_controller';

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

      // Use keyboard input to move and animate player
      this.on('preupdate', (evt) => {
        const engine = this.scene?.engine;
        if (!engine) return;
        const move = getMovementVector(engine);
        const speed = 120;

        if (move.size > 0) {
          this.vel = move.normalize().scale(speed);
          // Always set running animation when moving
          if (move.y < 0) {
            this.graphics.use(runAnimUp);
            this.currentDirection = 'up';
          } else if (move.y > 0) {
            this.graphics.use(runAnimDown);
            this.currentDirection = 'down';
          } else {
            // If moving horizontally, keep last vertical direction's animation
            if (this.currentDirection === 'up') {
              this.graphics.use(runAnimUp);
            } else {
              this.graphics.use(runAnimDown);
            }
          }
        } else {
          this.vel = this.vel.scale(0.8);
          // Only show idle sprite when NO keyboard input
          if (this.currentDirection === 'up') {
            this.graphics.use(this.idleSpriteUp);
          } else {
            this.graphics.use(this.idleSpriteDown);
          }
        }
      });
    }
}