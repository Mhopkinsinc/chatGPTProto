
import * as ex from 'excalibur';
import { Resources } from '../../../resources';

export class RinkActor extends ex.Actor {
    constructor(width: number, height: number) {
        super({
            x: width / 2,
            y: height / 2,
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
