import * as ex from 'excalibur';
import { PuckActor } from './puck';
import { RINK_LAYOUT } from '../../../config/rink_layout';

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

        // Clamp camera position within rink bounds (centered at 0,0)
        const halfW = cam.viewport.width / 2;
        const halfH = cam.viewport.height / 2;

        const minX = RINK_LAYOUT.xMin + halfW - RINK_LAYOUT.width / 2;
        const maxX = RINK_LAYOUT.xMax - halfW - RINK_LAYOUT.width / 2;
        const minY = RINK_LAYOUT.yMin + halfH - RINK_LAYOUT.height / 2;
        const maxY = RINK_LAYOUT.yMax - halfH - RINK_LAYOUT.height / 2;

        cam.pos.x = Math.max(minX, Math.min(maxX, newPos.x));
        cam.pos.y = Math.max(minY, Math.min(maxY, newPos.y));
    }
}