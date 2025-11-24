// src/scenes/rink/actors/puck.ts
import * as ex from 'excalibur';
import { Resources } from '../../../resources';

export class PuckActor extends ex.Actor {
  private speed = 150;
  private exactPos!: ex.Vector;

  private spriteSheet!: ex.SpriteSheet;
  private shadowSprite!: ex.Sprite;
  private idleSprite!: ex.Sprite;
  private flipAnim!: ex.Animation;

  private idleGraphic!: ex.GraphicsGroup;
  private flipGraphic!: ex.GraphicsGroup;

  constructor(x: number, y: number) {
    super({
      x,
      y,
      width: 8,
      height: 8,
      collisionType: ex.CollisionType.Active,
      anchor: ex.vec(0, 0)
    });
  }

  public onInitialize(_engine: ex.Engine): void {
    // Initialize exact position
    this.exactPos = this.pos.clone();

    // Create spritesheet (1 row, 10 columns, 8x8)
    this.spriteSheet = ex.SpriteSheet.fromImageSource({
      image: Resources.puck,
      grid: { rows: 1, columns: 10, spriteWidth: 8, spriteHeight: 8 }
    });

    // Shadow sprite at frame (0,0)
    this.shadowSprite = this.spriteSheet.getSprite(0, 0).clone();
    

    // Idle sprite at frame (0,1)
    this.idleSprite = this.spriteSheet.getSprite(1, 0);

    // Flip animation using frames 1–5
    this.flipAnim = ex.Animation.fromSpriteSheet(this.spriteSheet, [1, 2, 3, 4, 5], 100);
    this.flipAnim.strategy = ex.AnimationStrategy.Loop;

    // Graphics group for idle (shadow slightly below puck)
    this.idleGraphic = new ex.GraphicsGroup({
      members: [
        { graphic: this.shadowSprite, offset: ex.vec(-1, -1) }, // try 10 or 20 to test
        { graphic: this.idleSprite, offset: ex.vec(0, 0) }
      ]
    });

    // Graphics group for flip (shadow slightly below puck)
    this.flipGraphic = new ex.GraphicsGroup({
      members: [
        { graphic: this.shadowSprite, offset: ex.vec(0, -1) },
        { graphic: this.flipAnim, offset: ex.vec(0, 0) }
      ]
    });

    // Start with idle graphic
    this.graphics.use(this.idleGraphic);

    // Physics setup
    this.body.bounciness = 0.8;
    this.body.friction = 0.1;
    this.body.mass = 0.5;
  }

  public onPreUpdate(engine: ex.Engine): void {
    // ...existing code...

    const kb = engine.input.keyboard;
    const move = new ex.Vector(0, 0);

    // Keyboard control
    if (kb.isHeld(ex.Keys.Up)) move.y -= 1;
    if (kb.isHeld(ex.Keys.Down)) move.y += 1;
    if (kb.isHeld(ex.Keys.Left)) move.x -= 1;
    if (kb.isHeld(ex.Keys.Right)) move.x += 1;

    if (move.size > 0) {
      this.vel = move.normalize().scale(this.speed); // Move puck
      this.graphics.use(this.flipGraphic);           // Show flip animation + shadow
    } else {
      this.vel = this.vel.scale(0.9);                // Apply friction
      if (this.vel.size < 5) this.graphics.use(this.idleGraphic); // Return to idle
    }
  }

  public onPostUpdate(_engine: ex.Engine): void {
    // Save new exact position
    this.exactPos = this.pos.clone();
    // ...existing code...
  }

  public getExactPos(): ex.Vector {
    return this.exactPos;
  }

}