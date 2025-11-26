
import * as ex from 'excalibur';
import { Resources } from '../../../resources';

// Offset to align center ice faceoff dot with world origin (0,0)
// These are the world coords where center ice currently appears
const RINK_OFFSET = { x: 4, y: -22 };

export class RinkActor extends ex.Actor {
    constructor(width: number, height: number) {
        super({
            x: RINK_OFFSET.x, // Centered at (0,0)
            y: RINK_OFFSET.y,
            width,
            height,
            anchor: ex.Vector.Half,
            collisionType: ex.CollisionType.PreventCollision
        });
    }

    public onInitialize() {
        this.graphics.use(Resources.rinkBg.toSprite());
    }
}
