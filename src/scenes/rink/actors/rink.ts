
import * as ex from 'excalibur';
import { Resources } from '../../../resources';

export class RinkActor extends ex.Actor {
    constructor(width: number, height: number) {
        super({
            x: 0, // Centered at (0,0)
            y: 0,
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
