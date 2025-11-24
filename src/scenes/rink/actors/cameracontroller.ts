import * as ex from 'excalibur';
import { PuckActor } from './puck';

export class CameraControllerActor extends ex.Actor {
    private lerpFactor = 0.1;

    constructor(private target: PuckActor) {
        super({ x: 0, y: 0 });
    }

    public onPostUpdate(engine: ex.Engine): void {
        if (!this.target) return;

        const scene = engine.currentScene;
        const cam = scene.camera;
        const targetPos = this.target.getExactPos();
        const currentPos = cam.pos;

        const newPos = currentPos.add(targetPos.sub(currentPos).scale(this.lerpFactor));

        cam.pos = newPos; // use exact position for smooth camera movement
    }
}