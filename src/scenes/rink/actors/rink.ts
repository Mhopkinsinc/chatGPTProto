import * as ex from 'excalibur';

export class RinkActor extends ex.Actor {
    constructor(width: number, height: number) {
        super({
            x: width / 2,
            y: height / 2,
            width,
            height,
            color: ex.Color.fromHex('#98d8ff'),
            collisionType: ex.CollisionType.PreventCollision
        });
    }
}
